import { pool } from '../../../config/db';
import type { CrearResenaDTO, ResenaPublicaDTO, ResenaResponseDTO } from '../dto/resenas.dto';

// Forma de una fila tal como viene de la base (snake_case)
type ResenaRow = {
  id: number;
  turno_id: number;
  calificacion: number;
  comentario: string | null;
};

type ResenaPublicaRow = ResenaRow & {
  cliente_nombre: string;
  servicio_nombre: string;
  fecha: string;
};

type ResumenRow = { promedio: number | null; total: string };

// Traduce fila de la base -> DTO de salida
const toDTO = (row: ResenaRow): ResenaResponseDTO => ({
  id: row.id,
  turnoId: row.turno_id,
  calificacion: row.calificacion,
  comentario: row.comentario,
});

const toPublicaDTO = (row: ResenaPublicaRow): ResenaPublicaDTO => ({
  ...toDTO(row),
  clienteNombre: row.cliente_nombre,
  servicioNombre: row.servicio_nombre,
  fecha: row.fecha,
});

export async function crear(data: CrearResenaDTO): Promise<ResenaResponseDTO> {
  const { rows } = await pool.query<ResenaRow>(
    `INSERT INTO resena (turno_id, calificacion, comentario)
     VALUES ($1, $2, $3)
     RETURNING id, turno_id, calificacion, comentario`,
    [data.turnoId, data.calificacion, data.comentario ?? null],
  );
  return toDTO(rows[0]);
}

export async function buscarPorTurnoId(turnoId: number): Promise<ResenaResponseDTO | null> {
  const { rows } = await pool.query<ResenaRow>(
    `SELECT id, turno_id, calificacion, comentario
     FROM resena
     WHERE turno_id = $1`,
    [turnoId],
  );
  return rows[0] ? toDTO(rows[0]) : null;
}

// La reseña no tiene peluqueria_id: se llega a ella pasando por el turno (resena -> turno -> peluqueria).
export async function listarPorPeluqueria(peluqueriaId: number): Promise<ResenaPublicaDTO[]> {
  const { rows } = await pool.query<ResenaPublicaRow>(
    `SELECT r.id, r.turno_id, r.calificacion, r.comentario,
            u.nombre AS cliente_nombre,
            s.nombre AS servicio_nombre,
            to_char(t.fecha, 'YYYY-MM-DD') AS fecha
     FROM resena r
     JOIN turno   t ON t.id = r.turno_id
     JOIN usuario u ON u.id = t.usuario_id
     JOIN servicio s ON s.id = t.servicio_id
     WHERE t.peluqueria_id = $1
     ORDER BY r.id DESC`,
    [peluqueriaId],
  );
  return rows.map(toPublicaDTO);
}

// AVG devuelve numeric (texto en pg) y COUNT devuelve bigint (texto): se castea a float8 / se convierte.
export async function resumenPorPeluqueria(peluqueriaId: number): Promise<{ promedio: number | null; total: number }> {
  const { rows } = await pool.query<ResumenRow>(
    `SELECT ROUND(AVG(r.calificacion)::numeric, 1)::float8 AS promedio,
            COUNT(*) AS total
     FROM resena r
     JOIN turno t ON t.id = r.turno_id
     WHERE t.peluqueria_id = $1`,
    [peluqueriaId],
  );
  return { promedio: rows[0].promedio, total: Number(rows[0].total) };
}
