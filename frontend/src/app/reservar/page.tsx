'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { useSesion } from '@/lib/session';
import { crearTurno, obtenerDisponibilidad } from '@/features/turnos/turnos.api';
import { etiquetaDia, fechaLarga, formatearPrecio, proximosDias } from '@/features/turnos/fechas';
import type { Disponibilidad, Slot } from '@/features/turnos/turnos.types';

const DIAS_A_MOSTRAR = 14;

// URL esperada: /reservar?peluqueriaId=1&servicioId=1
// (la pantalla de la barbería / servicios de Integrantes 2 y 3 debe linkear acá).
function Reservar() {
  const router = useRouter();
  const params = useSearchParams();
  const { cargando, sesion } = useSesion();

  const peluqueriaId = Number(params.get('peluqueriaId'));
  const servicioId = Number(params.get('servicioId'));
  const parametrosValidos = Number.isInteger(peluqueriaId) && peluqueriaId > 0 && Number.isInteger(servicioId) && servicioId > 0;

  const dias = proximosDias(DIAS_A_MOSTRAR);
  const [fecha, setFecha] = useState(dias[0]);
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [cargandoSlots, setCargandoSlots] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cada vez que cambia el día, se pide la disponibilidad al backend.
  useEffect(() => {
    if (!parametrosValidos) return;
    let cancelado = false;
    setCargandoSlots(true);
    setSlot(null);
    setError(null);
    obtenerDisponibilidad(peluqueriaId, servicioId, fecha)
      .then((d) => {
        if (!cancelado) setDisponibilidad(d);
      })
      .catch((e: unknown) => {
        if (!cancelado) setError(e instanceof ApiError ? e.message : 'No se pudo cargar la disponibilidad');
      })
      .finally(() => {
        if (!cancelado) setCargandoSlots(false);
      });
    return () => {
      cancelado = true; // evita pisar el estado si el usuario ya cambió de día
    };
  }, [fecha, peluqueriaId, servicioId, parametrosValidos]);

  async function confirmar() {
    if (!sesion || !slot) return;
    setEnviando(true);
    setError(null);
    try {
      await crearTurno(sesion.token, { fecha, horarioInicio: slot.horarioInicio, peluqueriaId, servicioId });
      router.push('/mis-turnos?reservado=1');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'No se pudo reservar el turno');
      // Si alguien tomó el horario justo antes, se refresca la lista para que desaparezca.
      obtenerDisponibilidad(peluqueriaId, servicioId, fecha).then(setDisponibilidad).catch(() => undefined);
      setSlot(null);
    } finally {
      setEnviando(false);
    }
  }

  if (!parametrosValidos) {
    return <p className="aviso aviso--error">Falta elegir la barbería y el servicio para reservar.</p>;
  }

  return (
    <>
      <h1 className="titulo-pagina">Reservar turno</h1>
      {disponibilidad && (
        <p className="subtitulo-pagina">
          {disponibilidad.servicio.nombre} en {disponibilidad.peluqueria.nombre} · {disponibilidad.servicio.duracion} min
          {disponibilidad.servicio.precio !== null && <> · {formatearPrecio(disponibilidad.servicio.precio)}</>}
        </p>
      )}

      {!cargando && !sesion && (
        <div className="aviso aviso--info">Iniciá sesión como cliente para reservar un turno.</div>
      )}
      {!cargando && sesion && sesion.usuario.rol !== 'cliente' && (
        <div className="aviso aviso--info">Solo los clientes pueden reservar turnos.</div>
      )}

      <div className="dias" role="tablist" aria-label="Elegí un día">
        {dias.map((d) => {
          const { semana, numero } = etiquetaDia(d);
          return (
            <button
              key={d}
              type="button"
              className={d === fecha ? 'dia dia--activo' : 'dia'}
              onClick={() => setFecha(d)}
            >
              <span className="dia__semana">{semana}</span>
              <span className="dia__numero">{numero}</span>
            </button>
          );
        })}
      </div>

      {error && <div className="aviso aviso--error">{error}</div>}

      {cargandoSlots ? (
        <p className="aviso aviso--info">Cargando horarios…</p>
      ) : disponibilidad && disponibilidad.slots.length === 0 && !error ? (
        <div className="vacio">No hay horarios disponibles el {fechaLarga(fecha)}. Probá con otro día.</div>
      ) : (
        <div className="slots">
          {disponibilidad?.slots.map((s) => (
            <button
              key={s.horarioInicio}
              type="button"
              className={slot?.horarioInicio === s.horarioInicio ? 'slot slot--activo' : 'slot'}
              onClick={() => setSlot(s)}
            >
              {s.horarioInicio}
            </button>
          ))}
        </div>
      )}

      {slot && disponibilidad && (
        <div className="resumen">
          <p>
            <strong>{disponibilidad.servicio.nombre}</strong> · {disponibilidad.peluqueria.nombre}
          </p>
          <p>
            {fechaLarga(fecha)}, de {slot.horarioInicio} a {slot.horarioFin}
          </p>
        </div>
      )}

      {sesion?.usuario.rol === 'cliente' ? (
        <button type="button" className="boton boton--ancho" disabled={!slot || enviando} onClick={confirmar}>
          {enviando ? 'Reservando…' : 'Confirmar reserva'}
        </button>
      ) : (
        <Link href="/" className="boton boton--secundario boton--ancho" style={{ textAlign: 'center' }}>
          Volver al inicio
        </Link>
      )}
    </>
  );
}

export default function ReservarPage() {
  return (
    <main className="contenedor">
      {/* useSearchParams necesita Suspense para que `next build` no falle */}
      <Suspense fallback={<p className="aviso aviso--info">Cargando…</p>}>
        <Reservar />
      </Suspense>
    </main>
  );
}
