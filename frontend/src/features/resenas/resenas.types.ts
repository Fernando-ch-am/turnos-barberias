// Tipos que reflejan lo que responde el backend (backend/src/modules/resenas/dto/resenas.dto.ts).

export const COMENTARIO_MAX = 45;

export interface Resena {
  id: number;
  turnoId: number;
  calificacion: number;
  comentario: string | null;
}

export interface ResenaPublica extends Resena {
  clienteNombre: string;
  servicioNombre: string;
  fecha: string;
}

export interface ResenasPeluqueria {
  promedio: number | null;
  total: number;
  resenas: ResenaPublica[];
}
