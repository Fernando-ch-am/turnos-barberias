-- PROPUESTA de ajustes a la base de datos para turnos y reseñas (Integrante 1).
-- NO está aplicada. Hay que acordarla con el equipo antes de correrla en Supabase.
-- Todas las sentencias son seguras de repetir (IF NOT EXISTS / IF EXISTS).

-- 1) Una sola reseña por turno, garantizado por la base.
--    El service ya lo controla, pero dos pedidos simultáneos podrían colarse; con UNIQUE no.
--    (Si ya hay reseñas duplicadas, hay que borrarlas antes de crear el índice.)
CREATE UNIQUE INDEX IF NOT EXISTS resena_turno_id_unico ON resena (turno_id);

-- 2) El comentario de la reseña hoy es VARCHAR(45). El MVP respeta ese límite
--    (COMENTARIO_MAX = 45 en el DTO y en el frontend). Si el equipo prefiere más espacio:
--    ALTER TABLE resena ALTER COLUMN comentario TYPE VARCHAR(255);
--    ...y subir COMENTARIO_MAX en backend/src/modules/resenas/dto/resenas.dto.ts
--    y en frontend/src/features/resenas/resenas.types.ts.

-- 3) Acelera la búsqueda de turnos de un día en una peluquería (disponibilidad y agenda).
CREATE INDEX IF NOT EXISTS turno_peluqueria_fecha_idx ON turno (peluqueria_id, fecha);
