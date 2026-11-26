import { z } from 'zod';
import { esFechaValida } from '../../../shared/utils/fechas';

// Estados posibles de un turno (la columna turno.estado guarda uno de estos textos).
export const ESTADOS_TURNO = ['pendiente', 'confirmado', 'completado', 'cancelado'] as const;
export type EstadoTurno = (typeof ESTADOS_TURNO)[number];

// ---------- Piezas reutilizables ----------
const fechaSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato esperado: AAAA-MM-DD')
  .refine(esFechaValida, 'La fecha no existe');

const horaSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Formato esperado: HH:MM');

const idSchema = z.coerce.number().int().positive();

// ---------- Entradas ----------
// Lo que el cliente manda para reservar un turno.
// No incluye usuario (sale del token), estado (siempre arranca "pendiente") ni horario de fin
// (se calcula con la duración del servicio).
export const crearTurnoSchema = z.object({
  fecha: fechaSchema,
  horarioInicio: horaSchema,
  peluqueriaId: z.number().int().positive(),
  servicioId: z.number().int().positive(),
});
export type CrearTurnoDTO = z.infer<typeof crearTurnoSchema>;

// Query string de GET /turnos/disponibilidad (los query params llegan como texto: por eso coerce).
export const disponibilidadQuerySchema = z.object({
  peluqueriaId: idSchema,
  servicioId: idSchema,
  fecha: fechaSchema,
});
export type DisponibilidadQuery = z.infer<typeof disponibilidadQuerySchema>;

// Filtros opcionales de la agenda del profesional y de "mis turnos".
export const agendaQuerySchema = z.object({
  fecha: fechaSchema.optional(),
  peluqueriaId: idSchema.optional(),
});
export type AgendaQuery = z.infer<typeof agendaQuerySchema>;

export const misTurnosQuerySchema = z.object({
  estado: z.enum(ESTADOS_TURNO).optional(),
});

// Parámetro :id de la URL.
export const idParamSchema = z.object({ id: idSchema });

// El profesional cambia el estado. "pendiente" no está porque nunca se vuelve a él.
export const cambiarEstadoSchema = z.object({
  estado: z.enum(['confirmado', 'completado', 'cancelado']),
});
export type CambiarEstadoDTO = z.infer<typeof cambiarEstadoSchema>;

// ---------- Salidas ----------
export interface TurnoResponseDTO {
  id: number;
  fecha: string;
  horarioInicio: string;
  horarioFin: string;
  estado: string;
  usuarioId: number;
  peluqueriaId: number;
  servicioId: number;
}

// Turno con los datos que necesitan las pantallas (nombres, precio, si ya tiene reseña...).
export interface TurnoDetalleDTO extends TurnoResponseDTO {
  peluqueriaNombre: string;
  peluqueriaDireccion: string;
  servicioNombre: string;
  servicioPrecio: number | null;
  servicioDuracion: number | null;
  clienteNombre: string;
  clienteEmail: string;
  resenaId: number | null;
}

export interface SlotDTO {
  horarioInicio: string;
  horarioFin: string;
}

export interface DisponibilidadDTO {
  fecha: string;
  peluqueria: { id: number; nombre: string };
  servicio: { id: number; nombre: string; precio: number | null; duracion: number };
  slots: SlotDTO[];
}
