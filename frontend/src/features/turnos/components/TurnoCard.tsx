import type { ReactNode } from 'react';
import type { Turno } from '../turnos.types';
import { fechaLarga, formatearPrecio } from '../fechas';
import { EstadoBadge } from './EstadoBadge';

interface Props {
  turno: Turno;
  // 'cliente' muestra la barbería; 'profesional' muestra quién viene.
  vista: 'cliente' | 'profesional';
  children?: ReactNode; // los botones de acción los pone la pantalla
}

export function TurnoCard({ turno, vista, children }: Props) {
  return (
    <article className="tarjeta">
      <div className="tarjeta__fila">
        <div>
          <div className="tarjeta__titulo">
            {fechaLarga(turno.fecha)} · {turno.horarioInicio} a {turno.horarioFin}
          </div>
          <div className="tarjeta__meta">
            {turno.servicioNombre}
            {turno.servicioPrecio !== null && <> · {formatearPrecio(turno.servicioPrecio)}</>}
          </div>
          <div className="tarjeta__meta">
            {vista === 'cliente'
              ? `${turno.peluqueriaNombre} · ${turno.peluqueriaDireccion}`
              : `Cliente: ${turno.clienteNombre} (${turno.clienteEmail})`}
          </div>
        </div>
        <EstadoBadge estado={turno.estado} />
      </div>
      {children && <div className="tarjeta__acciones">{children}</div>}
    </article>
  );
}
