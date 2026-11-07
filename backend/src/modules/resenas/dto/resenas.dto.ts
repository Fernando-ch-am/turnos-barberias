import { z } from 'zod';

// La columna resena.comentario es VARCHAR(45). Si el equipo la agranda
// (ver docs/migraciones/001_ajustes_mvp.sql), alcanza con cambiar este número.
export const COMENTARIO_MAX = 45;

// ---------- Entradas ----------
// Lo que el cliente manda para crear una reseña (el usuario sale del token, no del body).
export const crearResenaSchema = z.object({
  turnoId: z.number().int().positive(),
  calificacion: z.number().int().min(1).max(5),
  comentario: z.string().trim().max(COMENTARIO_MAX).optional(),
});
export type CrearResenaDTO = z.infer<typeof crearResenaSchema>;

// Parámetro :peluqueriaId de la URL (llega como texto, por eso coerce).
export const peluqueriaIdParamSchema = z.object({
  peluqueriaId: z.coerce.number().int().positive(),
});

// ---------- Salidas ----------
// La reseña tal como se guardó.
export interface ResenaResponseDTO {
  id: number;
  turnoId: number;
  calificacion: number;
  comentario: string | null;
}

// La reseña como se muestra públicamente: con el nombre de quien la escribió y el servicio.
export interface ResenaPublicaDTO extends ResenaResponseDTO {
  clienteNombre: string;
  servicioNombre: string;
  fecha: string;
}

// Lo que devuelve GET /resenas/peluqueria/:id
export interface ResenasPeluqueriaDTO {
  promedio: number | null; // null si todavía no tiene reseñas
  total: number;
  resenas: ResenaPublicaDTO[];
}
