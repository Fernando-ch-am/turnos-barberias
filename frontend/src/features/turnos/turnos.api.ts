import { apiFetch } from '@/lib/api';
import type { CrearTurnoInput, Disponibilidad, EstadoTurno, Turno } from './turnos.types';

// Una función por endpoint del backend. Las pantallas llaman a estas funciones y no a fetch directo.

const conToken = (token: string): RequestInit => ({ headers: { Authorization: `Bearer ${token}` } });

export function obtenerDisponibilidad(peluqueriaId: number, servicioId: number, fecha: string) {
  const query = new URLSearchParams({
    peluqueriaId: String(peluqueriaId),
    servicioId: String(servicioId),
    fecha,
  });
  return apiFetch<Disponibilidad>(`/turnos/disponibilidad?${query}`);
}

export function crearTurno(token: string, datos: CrearTurnoInput) {
  return apiFetch<Turno>('/turnos', {
    method: 'POST',
    body: JSON.stringify(datos),
    ...conToken(token),
  });
}

export function listarMisTurnos(token: string) {
  return apiFetch<Turno[]>('/turnos/mios', conToken(token));
}

export function listarAgenda(token: string, fecha?: string) {
  const query = fecha ? `?fecha=${fecha}` : '';
  return apiFetch<Turno[]>(`/turnos/agenda${query}`, conToken(token));
}

export function cancelarTurno(token: string, id: number) {
  return apiFetch<Turno>(`/turnos/${id}/cancelar`, { method: 'PATCH', ...conToken(token) });
}

export function cambiarEstadoTurno(token: string, id: number, estado: Exclude<EstadoTurno, 'pendiente'>) {
  return apiFetch<Turno>(`/turnos/${id}/estado`, {
    method: 'PATCH',
    body: JSON.stringify({ estado }),
    ...conToken(token),
  });
}
