'use client';

import { use, useEffect, useState } from 'react';
import { ApiError } from '@/lib/api';
import { listarResenasDePeluqueria } from '@/features/resenas/resenas.api';
import type { ResenasPeluqueria } from '@/features/resenas/resenas.types';
import { Estrellas } from '@/features/resenas/components/Estrellas';
import { fechaLarga } from '@/features/turnos/fechas';

// Pública. En Next 15 `params` es una Promise: se lee con use().
export default function ResenasPeluqueriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const peluqueriaId = Number(id);

  const [datos, setDatos] = useState<ResenasPeluqueria | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isInteger(peluqueriaId) || peluqueriaId <= 0) {
      setError('Peluquería inválida');
      return;
    }
    listarResenasDePeluqueria(peluqueriaId)
      .then(setDatos)
      .catch((e: unknown) => setError(e instanceof ApiError ? e.message : 'No se pudieron cargar las reseñas'));
  }, [peluqueriaId]);

  return (
    <main className="contenedor">
      <h1 className="titulo-pagina">Reseñas</h1>

      {error && <div className="aviso aviso--error">{error}</div>}
      {!datos && !error && <p className="aviso aviso--info">Cargando…</p>}

      {datos && (
        <>
          <div className="tarjeta promedio">
            <span className="promedio__numero">{datos.promedio === null ? '–' : datos.promedio.toFixed(1)}</span>
            <div>
              {datos.promedio !== null && <Estrellas valor={datos.promedio} grande />}
              <div className="tarjeta__meta">
                {datos.total === 0 ? 'Todavía no hay reseñas' : `${datos.total} reseña${datos.total > 1 ? 's' : ''}`}
              </div>
            </div>
          </div>

          {datos.resenas.map((r) => (
            <article key={r.id} className="tarjeta">
              <div className="tarjeta__fila">
                <div className="tarjeta__titulo">{r.clienteNombre}</div>
                <Estrellas valor={r.calificacion} />
              </div>
              {r.comentario && <p style={{ margin: '0.5rem 0 0' }}>{r.comentario}</p>}
              <div className="tarjeta__meta">
                {r.servicioNombre} · {fechaLarga(r.fecha)}
              </div>
            </article>
          ))}
        </>
      )}
    </main>
  );
}
