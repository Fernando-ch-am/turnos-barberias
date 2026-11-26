'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { useSesion } from '@/lib/session';
import { crearResena } from '@/features/resenas/resenas.api';
import { COMENTARIO_MAX } from '@/features/resenas/resenas.types';
import { SelectorEstrellas } from '@/features/resenas/components/SelectorEstrellas';

// URL esperada: /resenas/nueva?turnoId=12  (se llega desde "Mis turnos" -> "Dejar reseña")
function NuevaResena() {
  const router = useRouter();
  const params = useSearchParams();
  const { cargando, sesion } = useSesion();

  const turnoId = Number(params.get('turnoId'));
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    if (!sesion) return;
    if (calificacion === 0) {
      setError('Elegí una calificación de 1 a 5 estrellas');
      return;
    }
    setEnviando(true);
    setError(null);
    try {
      await crearResena(sesion.token, {
        turnoId,
        calificacion,
        ...(comentario.trim() ? { comentario: comentario.trim() } : {}),
      });
      router.push('/mis-turnos');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'No se pudo enviar la reseña');
      setEnviando(false);
    }
  }

  if (!Number.isInteger(turnoId) || turnoId <= 0) return <p className="aviso aviso--error">Falta indicar el turno a reseñar.</p>;
  if (cargando) return <p className="aviso aviso--info">Cargando…</p>;
  if (!sesion || sesion.usuario.rol !== 'cliente') return <p className="aviso aviso--info">Iniciá sesión como cliente para dejar una reseña.</p>;

  return (
    <>
      <h1 className="titulo-pagina">Dejar reseña</h1>
      <p className="subtitulo-pagina">Contanos cómo te fue en tu turno.</p>

      <form onSubmit={enviar} className="tarjeta">
        {error && <div className="aviso aviso--error">{error}</div>}

        <div className="campo">
          <span className="campo__label">Calificación</span>
          <SelectorEstrellas valor={calificacion} onChange={setCalificacion} />
        </div>

        <label className="campo">
          <span className="campo__label">Comentario (opcional)</span>
          <input
            className="campo__input"
            type="text"
            value={comentario}
            maxLength={COMENTARIO_MAX}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Ej: Excelente atención"
          />
          <div className="campo__ayuda">
            {comentario.length}/{COMENTARIO_MAX}
          </div>
        </label>

        <button type="submit" className="boton boton--ancho" disabled={enviando}>
          {enviando ? 'Enviando…' : 'Enviar reseña'}
        </button>
      </form>
    </>
  );
}

export default function NuevaResenaPage() {
  return (
    <main className="contenedor">
      <Suspense fallback={<p className="aviso aviso--info">Cargando…</p>}>
        <NuevaResena />
      </Suspense>
    </main>
  );
}
