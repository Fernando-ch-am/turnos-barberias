// Tipos que reflejan lo que responde el backend (backend/src/modules/turnos/dto/turnos.dto.ts).

export type EstadoTurno = 'pendiente' | 'confirmado' | 'completado' | 'cancelado';

export interface Turno {
  id: number;
  fecha: string; // 'AAAA-MM-DD'
  horarioInicio: string; // 'HH:MM'
  horarioFin: string;
  estado: EstadoTurno;
  usuarioId: number;
  peluqueriaId: number;
  servicioId: number;
  peluqueriaNombre: string;
  peluqueriaDireccion: string;
  servicioNombre: string;
  servicioPrecio: number | null;
  servicioDuracion: number | null;
  clienteNombre: string;
  clienteEmail: string;
  resenaId: number | null;
}

export interface Slot {
  horarioInicio: string;
  horarioFin: string;
}

export interface Disponibilidad {
  fecha: string;
  peluqueria: { id: number; nombre: string };
  servicio: { id: number; nombre: string; precio: number | null; duracion: number };
  slots: Slot[];
}

export interface CrearTurnoInput {
  fecha: string;
  horarioInicio: string;
  peluqueriaId: number;
  servicioId: number;
}
