'use client';

import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { useSesion } from '@/lib/session';
import { cancelarTurno, listarMisTurnos } from '@/features/turnos/turnos.api';
import { TurnoCard } from '@/features/turnos/components/TurnoCard';
import type { Turno } from '@/features/turnos/turnos.types';

type Pestana = 'proximos' | 'historial';

function MisTurnos() {
  const params = useSearchParams();
  const { cargando, sesion } = useSesion();
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [pestana, setPestana] = useState<Pestana>('proximos');
  const [cargandoTurnos, setCargandoTurnos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = sesion?.token;

  const recargar = useCallback(async () => {
    if (!token) return;
    try {
      setTurnos(await listarMisTurnos(token));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'No se pudieron cargar tus turnos');
    } finally {
      setCargandoTurnos(false);
    }
  }, [token]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  async function cancelar(id: number) {
    if (!token || !window.confirm('¿Querés cancelar este turno?')) return;
    setError(null);
    try {
      await cancelarTurno(token, id);
      await recargar();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'No se pudo cancelar el turno');
    }
  }

  if (cargando) return <p className="aviso aviso--info">Cargando…</p>;
  if (!sesion) return <p className="aviso aviso--info">Iniciá sesión para ver tus turnos.</p>;
  if (sesion.usuario.rol !== 'cliente') return <p className="aviso aviso--info">Esta pantalla es para clientes.</p>;

  // "Próximos" = pendientes o confirmados. "Historial" = completados y cancelados.
  const proximos = turnos.filter((t) => t.estado === 'pendiente' || t.estado === 'confirmado');
  const historial = turnos.filter((t) => t.estado === 'completado' || t.estado === 'cancelado');
  const lista = pestana === 'proximos' ? proximos : historial;

  return (
    <>
      <h1 className="titulo-pagina">Mis turnos</h1>
      <p className="subtitulo-pagina">Tus reservas y su estado.</p>

      {params.get('reservado') && (
        <div className="aviso aviso--ok">¡Listo! Tu turno quedó reservado y está pendiente de confirmación.</div>
      )}
      {error && <div className="aviso aviso--error">{error}</div>}

      <div className="pestanas">
        <button
          type="button"
          className={pestana === 'proximos' ? 'pestana pestana--activa' : 'pestana'}
          onClick={() => setPestana('proximos')}
        >
          Próximos ({proximos.length})
        </button>
        <button
          type="button"
          className={pestana === 'historial' ? 'pestana pestana--activa' : 'pestana'}
          onClick={() => setPestana('historial')}
        >
          Historial ({historial.length})
        </button>
      </div>

      {cargandoTurnos ? (
        <p className="aviso aviso--info">Cargando turnos…</p>
      ) : lista.length === 0 ? (
        <div className="vacio">
          {pestana === 'proximos' ? 'No tenés turnos próximos.' : 'Todavía no tenés turnos en el historial.'}
        </div>
      ) : (
        lista.map((t) => (
          <TurnoCard key={t.id} turno={t} vista="cliente">
            {(t.estado === 'pendiente' || t.estado === 'confirmado') && (
              <button type="button" className="boton boton--peligro boton--chico" onClick={() => cancelar(t.id)}>
                Cancelar turno
              </button>
            )}
            {t.estado === 'completado' && t.resenaId === null && (
              <Link href={`/resenas/nueva?turnoId=${t.id}`} className="boton boton--chico">
                Dejar reseña
              </Link>
            )}
            {t.estado === 'completado' && t.resenaId !== null && (
              <span className="tarjeta__meta">Ya dejaste tu reseña</span>
            )}
          </TurnoCard>
        ))
      )}
    </>
  );
}

export default function MisTurnosPage() {
  return (
    <main className="contenedor">
      <Suspense fallback={<p className="aviso aviso--info">Cargando…</p>}>
        <MisTurnos />
      </Suspense>
    </main>
  );
}
