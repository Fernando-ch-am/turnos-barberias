import type { Pool, PoolClient } from 'pg';
import { pool } from '../../../config/db';
import type { EstadoTurno, TurnoDetalleDTO, TurnoResponseDTO } from '../dto/turnos.dto';

// Cada función puede ejecutarse con el pool (una consulta suelta) o con un `client`
// que viene de withTransaction (varias consultas dentro de la misma transacción).
type Db = Pool | PoolClient;

// ---------- Tipos de fila (tal como vienen de la base, en snake_case) ----------
export type TurnoRow = {
  id: number;
  fecha: string;
  horario_inicio: string;
  horario_fin: string;
  usuario_id: number;
  peluqueria_id: number;
  estado: string;
  servicio_id: number;
};

type TurnoDetalleRow = TurnoRow & {
  peluqueria_nombre: string;
  peluqueria_direccion: string;
  peluqueria_usuario_id: number | null;
  servicio_nombre: string;
  servicio_precio: number | null;
  servicio_duracion: number | null;
  cliente_nombre: string;
  cliente_email: string;
  resena_id: number | null;
};

export type ServicioParaReserva = {
  id: number;
  nombre: string;
  precio: number | null;
  duracion: number | null;
  activo: boolean;
  peluqueria_id: number;
  peluqueria_nombre: string;
};

export type Intervalo = { inicio: string; fin: string };

// ---------- Mapeos fila -> DTO ----------
const toDTO = (row: TurnoRow): TurnoResponseDTO => ({
  id: row.id,
  fecha: row.fecha,
  horarioInicio: row.horario_inicio,
  horarioFin: row.horario_fin,
  estado: row.estado,
  usuarioId: row.usuario_id,
  peluqueriaId: row.peluqueria_id,
  servicioId: row.servicio_id,
});

const toDetalleDTO = (row: TurnoDetalleRow): TurnoDetalleDTO => ({
  ...toDTO(row),
  peluqueriaNombre: row.peluqueria_nombre,
  peluqueriaDireccion: row.peluqueria_direccion,
  servicioNombre: row.servicio_nombre,
  servicioPrecio: row.servicio_precio,
  servicioDuracion: row.servicio_duracion,
  clienteNombre: row.cliente_nombre,
  clienteEmail: row.cliente_email,
  resenaId: row.resena_id,
});

// to_char convierte DATE y TIME a texto ('2026-11-10', '09:30'). Sin esto, pg devuelve
// la fecha como objeto Date de JavaScript y aparecen problemas de zona horaria.
const COLUMNAS_TURNO = `
  t.id,
  to_char(t.fecha, 'YYYY-MM-DD')          AS fecha,
  to_char(t.horario_inicio, 'HH24:MI')    AS horario_inicio,
  to_char(t.horario_fin, 'HH24:MI')       AS horario_fin,
  t.usuario_id, t.peluqueria_id, t.estado, t.servicio_id`;

const SELECT_DETALLE = `
  SELECT ${COLUMNAS_TURNO},
         p.nombre_p    AS peluqueria_nombre,
         p.direccion   AS peluqueria_direccion,
         p.usuario_id  AS peluqueria_usuario_id,
         s.nombre      AS servicio_nombre,
         s.precio      AS servicio_precio,
         s.duracion    AS servicio_duracion,
         u.nombre      AS cliente_nombre,
         u.email       AS cliente_email,
         (SELECT MIN(r.id) FROM resena r WHERE r.turno_id = t.id) AS resena_id
  FROM turno t
  JOIN peluqueria p ON p.id = t.peluqueria_id
  JOIN servicio   s ON s.id = t.servicio_id
  JOIN usuario    u ON u.id = t.usuario_id`;

// ---------- Consultas de un turno ----------
export async function buscarPorId(id: number, db: Db = pool): Promise<TurnoRow | null> {
  const { rows } = await db.query<TurnoRow>(`SELECT ${COLUMNAS_TURNO} FROM turno t WHERE t.id = $1`, [id]);
  return rows[0] ?? null;
}

/** Turno con datos de la peluquería, el servicio y el cliente. `peluqueriaUsuarioId` = dueño del local. */
export async function buscarDetallePorId(
  id: number,
  db: Db = pool,
): Promise<(TurnoDetalleDTO & { peluqueriaUsuarioId: number | null }) | null> {
  const { rows } = await db.query<TurnoDetalleRow>(`${SELECT_DETALLE} WHERE t.id = $1`, [id]);
  const row = rows[0];
  return row ? { ...toDetalleDTO(row), peluqueriaUsuarioId: row.peluqueria_usuario_id } : null;
}

// ---------- Datos de otros módulos (solo lectura) para calcular y validar reservas ----------
// Un servicio con activo = NULL se considera activo: solo `false` lo da de baja.
export async function buscarServicioParaReserva(servicioId: number, db: Db = pool): Promise<ServicioParaReserva | null> {
  const { rows } = await db.query<ServicioParaReserva>(
    `SELECT s.id, s.nombre, s.precio, s.duracion,
            (s.activo IS NOT FALSE) AS activo,
            s.peluqueria_id, p.nombre_p AS peluqueria_nombre
     FROM servicio s
     JOIN peluqueria p ON p.id = s.peluqueria_id
     WHERE s.id = $1`,
    [servicioId],
  );
  return rows[0] ?? null;
}

/** Franjas de atención de una peluquería para un día de la semana (ISO: 1 = lunes ... 7 = domingo). */
export async function horariosDelDia(peluqueriaId: number, dia: number, db: Db = pool): Promise<Intervalo[]> {
  const { rows } = await db.query<Intervalo>(
    `SELECT to_char(horario_inicio, 'HH24:MI') AS inicio,
            to_char(horario_fin, 'HH24:MI')    AS fin
     FROM horario
     WHERE peluqueria_id = $1 AND dia = $2
       AND horario_inicio IS NOT NULL AND horario_fin IS NOT NULL
     ORDER BY horario_inicio`,
    [peluqueriaId, dia],
  );
  return rows;
}

// ---------- Disponibilidad ----------
/** Intervalos ya reservados ese día (los turnos cancelados liberan el horario). */
export async function intervalosOcupados(peluqueriaId: number, fecha: string, db: Db = pool): Promise<Intervalo[]> {
  const { rows } = await db.query<Intervalo>(
    `SELECT to_char(horario_inicio, 'HH24:MI') AS inicio,
            to_char(horario_fin, 'HH24:MI')    AS fin
     FROM turno
     WHERE peluqueria_id = $1 AND fecha = $2 AND estado IS DISTINCT FROM 'cancelado'
     ORDER BY horario_inicio`,
    [peluqueriaId, fecha],
  );
  return rows;
}

/** ¿Hay algún turno no cancelado que pise el intervalo [inicio, fin)? */
export async function existeSolapamiento(
  peluqueriaId: number,
  fecha: string,
  inicio: string,
  fin: string,
  db: Db = pool,
): Promise<boolean> {
  const { rowCount } = await db.query(
    `SELECT 1 FROM turno
     WHERE peluqueria_id = $1 AND fecha = $2 AND estado IS DISTINCT FROM 'cancelado'
       AND horario_inicio < $4::time AND horario_fin > $3::time
     LIMIT 1`,
    [peluqueriaId, fecha, inicio, fin],
  );
  return (rowCount ?? 0) > 0;
}

/**
 * Candado de la agenda de una peluquería en un día. Si dos personas reservan a la vez,
 * la segunda espera a que termine la transacción de la primera, y recién ahí controla el solapamiento.
 * El candado se libera solo al hacer COMMIT o ROLLBACK.
 */
export async function bloquearAgenda(client: PoolClient, peluqueriaId: number, fecha: string): Promise<void> {
  await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [`turnos:${peluqueriaId}:${fecha}`]);
}

// ---------- Escritura ----------
export async function crear(
  client: PoolClient,
  datos: { fecha: string; horarioInicio: string; horarioFin: string; peluqueriaId: number; servicioId: number },
  usuarioId: number,
  estado: EstadoTurno,
): Promise<TurnoResponseDTO> {
  const { rows } = await client.query<TurnoRow>(
    `INSERT INTO turno (fecha, horario_inicio, horario_fin, usuario_id, peluqueria_id, estado, servicio_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, to_char(fecha, 'YYYY-MM-DD') AS fecha,
               to_char(horario_inicio, 'HH24:MI') AS horario_inicio,
               to_char(horario_fin, 'HH24:MI') AS horario_fin,
               usuario_id, peluqueria_id, estado, servicio_id`,
    [datos.fecha, datos.horarioInicio, datos.horarioFin, usuarioId, datos.peluqueriaId, estado, datos.servicioId],
  );
  return toDTO(rows[0]);
}

export async function actualizarEstado(id: number, estado: EstadoTurno, db: Db = pool): Promise<void> {
  await db.query('UPDATE turno SET estado = $2 WHERE id = $1', [id, estado]);
}

// ---------- Listados ----------
/** Turnos de un cliente, del más nuevo al más viejo. */
export async function listarPorCliente(usuarioId: number, estado?: EstadoTurno): Promise<TurnoDetalleDTO[]> {
  const params: unknown[] = [usuarioId];
  let filtro = '';
  if (estado) {
    params.push(estado);
    filtro = 'AND t.estado = $2';
  }
  const { rows } = await pool.query<TurnoDetalleRow>(
    `${SELECT_DETALLE}
     WHERE t.usuario_id = $1 ${filtro}
     ORDER BY t.fecha DESC, t.horario_inicio DESC`,
    params,
  );
  return rows.map(toDetalleDTO);
}

/** Agenda de un profesional: turnos de las peluquerías de las que es dueño. */
export async function listarAgenda(
  duenioId: number,
  filtros: { fecha?: string; peluqueriaId?: number },
): Promise<TurnoDetalleDTO[]> {
  const params: unknown[] = [duenioId];
  const condiciones = ['p.usuario_id = $1'];
  if (filtros.fecha) {
    params.push(filtros.fecha);
    condiciones.push(`t.fecha = $${params.length}`);
  }
  if (filtros.peluqueriaId) {
    params.push(filtros.peluqueriaId);
    condiciones.push(`t.peluqueria_id = $${params.length}`);
  }
  const { rows } = await pool.query<TurnoDetalleRow>(
    `${SELECT_DETALLE}
     WHERE ${condiciones.join(' AND ')}
     ORDER BY t.fecha, t.horario_inicio`,
    params,
  );
  return rows.map(toDetalleDTO);
}
