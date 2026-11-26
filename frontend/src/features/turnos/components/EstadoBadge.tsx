import type { EstadoTurno } from '../turnos.types';

const TEXTO: Record<EstadoTurno, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  completado: 'Completado',
  cancelado: 'Cancelado',
};

export function EstadoBadge({ estado }: { estado: EstadoTurno }) {
  return <span className={`estado estado--${estado}`}>{TEXTO[estado]}</span>;
}
