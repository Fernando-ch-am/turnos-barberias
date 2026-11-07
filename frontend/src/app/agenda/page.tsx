'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/lib/api';
import { useSesion } from '@/lib/session';
import { cambiarEstadoTurno, cancelarTurno, listarAgenda } from '@/features/turnos/turnos.api';
import { TurnoCard } from '@/features/turnos/components/TurnoCard';
import { etiquetaDia, fechaLarga, hoy, proximosDias } from '@/features/turnos/fechas';
import type { Turno } from '@/features/turnos/turnos.types';

export default function AgendaPage() {
  const { cargando, sesion } = useSesion();
  const dias = proximosDias(7);
  const [fecha, setFecha] = useState(hoy());
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [cargandoTurnos, setCargandoTurnos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = sesion?.token;

  const recargar = useCallback(async () => {
    if (!token) return;
    setCargandoTurnos(true);
    try {
      setTurnos(await listarAgenda(token, fecha));
      setError(null);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'No se pudo cargar la agenda');
    } finally {
      setCargandoTurnos(false);
    }
  }, [token, fecha]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  // Una sola función para los tres botones del profesional.
  async function cambiar(id: number, estado: 'confirmado' | 'completado' | 'cancelado') {
    if (!token) return;
    setError(null);
    try {
      if (estado === 'cancelado') await cancelarTurno(token, id);
      else await cambiarEstadoTurno(token, id, estado);
      await recargar();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'No se pudo actualizar el turno');
    }
  }

  return (
    <main className="contenedor">
      {cargando ? (
        <p className="aviso aviso--info">Cargando…</p>
      ) : !sesion ? (
        <p className="aviso aviso--info">Iniciá sesión para ver tu agenda.</p>
      ) : sesion.usuario.rol !== 'profesional' ? (
        <p className="aviso aviso--info">Esta pantalla es para profesionales.</p>
      ) : (
        <>
          <h1 className="titulo-pagina">Agenda</h1>
          <p className="subtitulo-pagina">Turnos de tu peluquería para el {fechaLarga(fecha)}.</p>

          <div className="dias">
            {dias.map((d) => {
              const { semana, numero } = etiquetaDia(d);
              return (
                <button key={d} type="button" className={d === fecha ? 'dia dia--activo' : 'dia'} onClick={() => setFecha(d)}>
                  <span className="dia__semana">{semana}</span>
                  <span className="dia__numero">{numero}</span>
                </button>
              );
            })}
          </div>

          {error && <div className="aviso aviso--error">{error}</div>}

          {cargandoTurnos ? (
            <p className="aviso aviso--info">Cargando turnos…</p>
          ) : turnos.length === 0 ? (
            <div className="vacio">No hay turnos para este día.</div>
          ) : (
            turnos.map((t) => (
              <TurnoCard key={t.id} turno={t} vista="profesional">
                {t.estado === 'pendiente' && (
                  <button type="button" className="boton boton--chico" onClick={() => cambiar(t.id, 'confirmado')}>
                    Confirmar
                  </button>
                )}
                {t.estado === 'confirmado' && (
                  <button type="button" className="boton boton--chico" onClick={() => cambiar(t.id, 'completado')}>
                    Marcar completado
                  </button>
                )}
                {(t.estado === 'pendiente' || t.estado === 'confirmado') && (
                  <button type="button" className="boton boton--peligro boton--chico" onClick={() => cambiar(t.id, 'cancelado')}>
                    Cancelar
                  </button>
                )}
              </TurnoCard>
            ))
          )}
        </>
      )}
    </main>
  );
}
