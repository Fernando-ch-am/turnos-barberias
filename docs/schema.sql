-- Script corregido — Turnos Barberías
-- Correcciones aplicadas:
--   1. reseña.turno_id en vez de peluqueria_id (con su FK)
--   2. Nombres de CONSTRAINT únicos en todo el schema (evita error de ejecución)
--   3. servicio.peluqueria_id como INT + FK agregada
--   4. turno.estado (VARCHAR) en vez de disponible (TINYINT) — ver nota abajo
--   5. servicio.duracion como INT en vez de DOUBLE

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`peluqueria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`peluqueria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_p` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `usuario_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_peluqueria_usuario_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_peluqueria_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`servicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`servicio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `precio` DOUBLE NULL,
  `duracion` INT NULL,
  `activo` TINYINT NULL,
  `peluqueria_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_servicio_peluqueria_idx` (`peluqueria_id` ASC) VISIBLE,
  CONSTRAINT `fk_servicio_peluqueria`
    FOREIGN KEY (`peluqueria_id`)
    REFERENCES `mydb`.`peluqueria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`horario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `peluqueria_id` INT NULL,
  `dia` INT NULL,
  `horario_inicio` TIME NULL,
  `horario_fin` TIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_horario_peluqueria_idx` (`peluqueria_id` ASC) VISIBLE,
  CONSTRAINT `fk_horario_peluqueria`
    FOREIGN KEY (`peluqueria_id`)
    REFERENCES `mydb`.`peluqueria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`turno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`turno` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL,
  `horario_inicio` TIME NULL,
  `horario_fin` TIME NULL,
  `estado` VARCHAR(45) NULL,
  `usuario_id` INT NULL,
  `peluqueria_id` INT NULL,
  `servicio_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_turno_servicio_idx` (`servicio_id` ASC) VISIBLE,
  INDEX `fk_turno_usuario_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_turno_peluqueria_idx` (`peluqueria_id` ASC) VISIBLE,
  CONSTRAINT `fk_turno_servicio`
    FOREIGN KEY (`servicio_id`)
    REFERENCES `mydb`.`servicio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_turno_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_turno_peluqueria`
    FOREIGN KEY (`peluqueria_id`)
    REFERENCES `mydb`.`peluqueria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`reseña`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reseña` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `turno_id` INT NULL,
  `calificacion` INT NULL,
  `comentario` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_resena_turno_idx` (`turno_id` ASC) VISIBLE,
  CONSTRAINT `fk_resena_turno`
    FOREIGN KEY (`turno_id`)
    REFERENCES `mydb`.`turno` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
