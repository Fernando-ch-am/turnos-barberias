import { withTransaction } from '../../../config/db';
import { AppError } from '../../../shared/errors/AppError';
import {
  ahoraLocal,
  diaDeSemanaISO,
  horaAMinutos,
  minutosAHora,
  minutosHastaTurno,
  sumarMinutos,
} from '../../../shared/utils/fechas';
import type { UsuarioAutenticado } from '../../../types/express';
import type {
  AgendaQuery,
  CrearTurnoDTO,
  DisponibilidadDTO,
  DisponibilidadQuery,
  EstadoTurno,
  SlotDTO,
  TurnoDetalleDTO,
} from '../dto/turnos.dto';
import * as turnosRepo from '../repository/turnos.repository';
import type { Intervalo, ServicioParaReserva } from '../repository/turnos.repository';

// ---------- Reglas de negocio configurables ----------
const PASO_SLOTS_MIN = 30; // los turnos arrancan cada 30 minutos (9:00, 9:30, 10:00...)
const MIN_CANCELACION_CLIENTE_MIN = 120; // el cliente puede cancelar hasta 2 horas antes

// Qué cambios de estado se permiten (de -> a).
const TRANSICIONES: Record<string, EstadoTurno[]> = {
  pendiente: ['confirmado', 'cancelado'],
  confirmado: ['completado', 'cancelado'],
};

// ---------- Cálculo de disponibilidad (función pura, fácil de probar) ----------
/**
 * Genera los horarios de inicio posibles dentro de las franjas de atención.
 * Un horario sirve si el turno completo entra en la franja, no pisa a otro turno
 * y (si es hoy) todavía no pasó.
 */
export function generarSlots(params: {
  ventanas: Intervalo[];
  ocupados: Intervalo[];
  duracion: number;
  fecha: string;
  ahora?: Date;
  paso?: number;
}): SlotDTO[] {
  const { ventanas, ocupados, duracion, fecha, ahora = new Date(), paso = PASO_SLOTS_MIN } = params;
  const hoy = ahoraLocal(ahora);
  if (fecha < hoy.fecha) return [];

  const ocupadosMin = ocupados.map((o) => [horaAMinutos(o.inicio), horaAMinutos(o.fin)] as const);
  const ahoraMin = horaAMinutos(hoy.hora);
  const inicios = new Set<number>();

  for (const ventana of ventanas) {
    const desde = horaAMinutos(ventana.inicio);
    const hasta = horaAMinutos(ventana.fin);
    for (let inicio = desde; inicio + duracion <= hasta; inicio += paso) {
      const fin = inicio + duracion;
      if (fecha === hoy.fecha && inicio <= ahoraMin) continue; // ya pasó
      const pisaOtroTurno = ocupadosMin.some(([oInicio, oFin]) => inicio < oFin && oInicio < fin);
      if (!pisaOtroTurno) inicios.add(inicio);
    }
  }

  return [...inicios]
    .sort((a, b) => a - b)
    .map((inicio) => ({ horarioInicio: minutosAHora(inicio), horarioFin: minutosAHora(inicio + duracion) }));
}

// ---------- Validaciones compartidas ----------
async function obtenerServicioReservable(peluqueriaId: number, servicioId: number): Promise<ServicioParaReserva & { duracion: number }> {
  const servicio = await turnosRepo.buscarServicioParaReserva(servicioId);
  if (!servicio || servicio.peluqueria_id !== peluqueriaId) {
    throw AppError.notFound('El servicio no existe en esa peluquería');
  }
  if (!servicio.activo) throw AppError.conflict('El servicio no está disponible');
  if (!servicio.duracion || servicio.duracion <= 0) {
    throw AppError.conflict('El servicio no tiene una duración configurada');
  }
  return { ...servicio, duracion: servicio.duracion };
}

// ---------- Casos de uso ----------
export async function obtenerDisponibilidad(query: DisponibilidadQuery): Promise<DisponibilidadDTO> {
  const servicio = await obtenerServicioReservable(query.peluqueriaId, query.servicioId);
  const [ventanas, ocupados] = await Promise.all([
    turnosRepo.horariosDelDia(query.peluqueriaId, diaDeSemanaISO(query.fecha)),
    turnosRepo.intervalosOcupados(query.peluqueriaId, query.fecha),
  ]);

  return {
    fecha: query.fecha,
    peluqueria: { id: servicio.peluqueria_id, nombre: servicio.peluqueria_nombre },
    servicio: { id: servicio.id, nombre: servicio.nombre, precio: servicio.precio, duracion: servicio.duracion },
    slots: generarSlots({ ventanas, ocupados, duracion: servicio.duracion, fecha: query.fecha }),
  };
}

export async function crearTurno(usuarioId: number, data: CrearTurnoDTO): Promise<TurnoDetalleDTO> {
  const servicio = await obtenerServicioReservable(data.peluqueriaId, data.servicioId);

  const horarioFin = sumarMinutos(data.horarioInicio, servicio.duracion);
  if (!horarioFin) throw AppError.badRequest('El turno no puede terminar después de las 24:00');

  if (minutosHastaTurno(data.fecha, data.horarioInicio) <= 0) {
    throw AppError.badRequest('Solo se pueden reservar turnos en una fecha y hora futuras');
  }

  // Todo lo que sigue es una sola transacción: o se crea el turno o no pasa nada.
  const turnoId = await withTransaction(async (client) => {
    // 1. Candado: si otro cliente reserva a la vez en esta agenda, espera su turno.
    await turnosRepo.bloquearAgenda(client, data.peluqueriaId, data.fecha);

    // 2. El turno completo tiene que entrar en una franja de atención de ese día.
    const ventanas = await turnosRepo.horariosDelDia(data.peluqueriaId, diaDeSemanaISO(data.fecha), client);
    const dentroDeHorario = ventanas.some((v) => v.inicio <= data.horarioInicio && horarioFin <= v.fin);
    if (!dentroDeHorario) throw AppError.badRequest('El horario está fuera del horario de atención');

    // 3. No puede pisar a otro turno.
    if (await turnosRepo.existeSolapamiento(data.peluqueriaId, data.fecha, data.horarioInicio, horarioFin, client)) {
      throw AppError.conflict('Ese horario ya fue reservado, elegí otro');
    }

    // 4. Se crea, siempre en estado "pendiente".
    const turno = await turnosRepo.crear(client, { ...data, horarioFin }, usuarioId, 'pendiente');
    return turno.id;
  });

  return (await turnosRepo.buscarDetallePorId(turnoId))!;
}

export function listarMisTurnos(usuarioId: number, estado?: EstadoTurno) {
  return turnosRepo.listarPorCliente(usuarioId, estado);
}

export function listarAgenda(profesionalId: number, filtros: AgendaQuery) {
  return turnosRepo.listarAgenda(profesionalId, filtros);
}

/** Carga el turno y verifica que el usuario tenga relación con él (es el cliente o el dueño del local). */
async function obtenerTurnoAutorizado(usuario: UsuarioAutenticado, id: number) {
  const turno = await turnosRepo.buscarDetallePorId(id);
  if (!turno) throw AppError.notFound('El turno no existe');

  const esElCliente = usuario.rol === 'cliente' && turno.usuarioId === usuario.id;
  const esElDuenio = usuario.rol === 'profesional' && turno.peluqueriaUsuarioId === usuario.id;
  if (!esElCliente && !esElDuenio) throw AppError.forbidden('Este turno no te pertenece');

  return turno;
}

export async function cancelarTurno(usuario: UsuarioAutenticado, id: number): Promise<TurnoDetalleDTO> {
  const turno = await obtenerTurnoAutorizado(usuario, id);

  if (turno.estado !== 'pendiente' && turno.estado !== 'confirmado') {
    throw AppError.conflict('Este turno ya no se puede cancelar');
  }
  if (usuario.rol === 'cliente' && minutosHastaTurno(turno.fecha, turno.horarioInicio) < MIN_CANCELACION_CLIENTE_MIN) {
    throw AppError.conflict('Solo podés cancelar hasta 2 horas antes del turno');
  }

  await turnosRepo.actualizarEstado(id, 'cancelado');
  return (await turnosRepo.buscarDetallePorId(id))!;
}

export async function cambiarEstado(
  usuario: UsuarioAutenticado,
  id: number,
  nuevoEstado: EstadoTurno,
): Promise<TurnoDetalleDTO> {
  const turno = await obtenerTurnoAutorizado(usuario, id);

  const permitidos = TRANSICIONES[turno.estado] ?? [];
  if (!permitidos.includes(nuevoEstado)) {
    throw AppError.conflict(`Un turno ${turno.estado} no puede pasar a ${nuevoEstado}`);
  }
  if (nuevoEstado === 'completado' && minutosHastaTurno(turno.fecha, turno.horarioInicio) > 0) {
    throw AppError.conflict('No se puede completar un turno que todavía no empezó');
  }

  await turnosRepo.actualizarEstado(id, nuevoEstado);
  return (await turnosRepo.buscarDetallePorId(id))!;
}
