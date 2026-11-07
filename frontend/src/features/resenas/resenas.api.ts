import { apiFetch } from '@/lib/api';
import type { Resena, ResenasPeluqueria } from './resenas.types';

export function listarResenasDePeluqueria(peluqueriaId: number) {
  return apiFetch<ResenasPeluqueria>(`/resenas/peluqueria/${peluqueriaId}`);
}

export function crearResena(
  token: string,
  datos: { turnoId: number; calificacion: number; comentario?: string },
) {
  return apiFetch<Resena>('/resenas', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: { Authorization: `Bearer ${token}` },
  });
}
