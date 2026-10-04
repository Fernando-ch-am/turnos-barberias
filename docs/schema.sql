-- Script migrado a PostgreSQL — Turnos Barberías
-- Cambios respecto a la versión MySQL:
--   - Sin SET @OLD_... (son variables de sesión propias de MySQL)
--   - Sin CREATE SCHEMA / USE (se usa el schema "public" por defecto de Postgres/Supabase)
--   - AUTO_INCREMENT -> GENERATED ALWAYS AS IDENTITY
--   - Sin backticks alrededor de nombres (no hacen falta en Postgres)
--   - TINYINT -> BOOLEAN (campo "activo")
--   - Sin ENGINE = InnoDB (no existe en Postgres)
--   - Los INDEX inline de MySQL pasan a CREATE INDEX separados al final
 
-- -----------------------------------------------------
-- Table usuario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario (
  id INT GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(45) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  rol VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
);
 
-- -----------------------------------------------------
-- Table peluqueria
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS peluqueria (
  id INT GENERATED ALWAYS AS IDENTITY,
  nombre_p VARCHAR(45) NOT NULL,
  descripcion VARCHAR(45) NOT NULL,
  telefono VARCHAR(45) NOT NULL,
  direccion VARCHAR(45) NOT NULL,
  usuario_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_peluqueria_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
 
CREATE INDEX IF NOT EXISTS fk_peluqueria_usuario_idx ON peluqueria (usuario_id);
 
-- -----------------------------------------------------
-- Table servicio
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS servicio (
  id INT GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(45),
  descripcion VARCHAR(45),
  precio DOUBLE PRECISION,
  duracion INT,
  activo BOOLEAN,
  peluqueria_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_servicio_peluqueria
    FOREIGN KEY (peluqueria_id)
    REFERENCES peluqueria (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
 
CREATE INDEX IF NOT EXISTS fk_servicio_peluqueria_idx ON servicio (peluqueria_id);
 
-- -----------------------------------------------------
-- Table horario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS horario (
  id INT GENERATED ALWAYS AS IDENTITY,
  peluqueria_id INT,
  dia INT,
  horario_inicio TIME,
  horario_fin TIME,
  PRIMARY KEY (id),
  CONSTRAINT fk_horario_peluqueria
    FOREIGN KEY (peluqueria_id)
    REFERENCES peluqueria (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
 
CREATE INDEX IF NOT EXISTS fk_horario_peluqueria_idx ON horario (peluqueria_id);
 
-- -----------------------------------------------------
-- Table turno
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS turno (
  id INT GENERATED ALWAYS AS IDENTITY,
  fecha DATE,
  horario_inicio TIME,
  horario_fin TIME,
  estado VARCHAR(45),
  usuario_id INT,
  peluqueria_id INT,
  servicio_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_turno_servicio
    FOREIGN KEY (servicio_id)
    REFERENCES servicio (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_turno_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_turno_peluqueria
    FOREIGN KEY (peluqueria_id)
    REFERENCES peluqueria (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
 
CREATE INDEX IF NOT EXISTS fk_turno_servicio_idx ON turno (servicio_id);
CREATE INDEX IF NOT EXISTS fk_turno_usuario_idx ON turno (usuario_id);
CREATE INDEX IF NOT EXISTS fk_turno_peluqueria_idx ON turno (peluqueria_id);
 
-- -----------------------------------------------------
-- Table reseña
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS reseña (
  id INT GENERATED ALWAYS AS IDENTITY,
  turno_id INT,
  calificacion INT,
  comentario VARCHAR(45),
  PRIMARY KEY (id),
  CONSTRAINT fk_resena_turno
    FOREIGN KEY (turno_id)
    REFERENCES turno (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
 
CREATE INDEX IF NOT EXISTS fk_resena_turno_idx ON reseña (turno_id);
 