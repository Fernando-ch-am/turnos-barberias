'use client';

import Link from 'next/link';
import { cerrarSesion, useSesion } from '@/lib/session';

// Barra superior. Muestra los links según el rol de la sesión.
// (Integrante 2 puede reemplazarla o ampliarla con login/registro.)
export function Cabecera() {
  const { sesion } = useSesion();
  const rol = sesion?.usuario.rol;

  return (
    <header className="cabecera">
      <div className="cabecera__interior">
        <Link href="/" className="cabecera__marca">
          Turnos Barberías
        </Link>
        <nav className="cabecera__nav">
          {rol === 'cliente' && <Link href="/mis-turnos">Mis turnos</Link>}
          {rol === 'profesional' && <Link href="/agenda">Agenda</Link>}
        </nav>
        {sesion && (
          <span className="cabecera__usuario">
            {sesion.usuario.nombre} ·{' '}
            <Link href="/" onClick={() => cerrarSesion()}>
              salir
            </Link>
          </span>
        )}
      </div>
    </header>
  );
}
