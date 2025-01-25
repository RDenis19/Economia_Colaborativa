-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cofinance
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cofinance
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cofinance` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci ;
USE `cofinance` ;

-- -----------------------------------------------------
-- Table `cofinance`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(50) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `fecha_registro` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE,
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`usuario_informacion_personal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`usuario_informacion_personal` (
  `id_usuario` INT NOT NULL,
  `nombres` VARCHAR(50) NOT NULL,
  `apellidos` VARCHAR(50) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `identificacion` VARCHAR(10) NOT NULL,
  `genero` ENUM('M', 'F', 'O') NOT NULL DEFAULT 'O',
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuario_informacion_personal_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_informacion_personal_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`usuario_informacion_contacto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`usuario_informacion_contacto` (
  `id_usuario` INT NOT NULL,
  `provincia` VARCHAR(45) NOT NULL,
  `canton` VARCHAR(45) NOT NULL,
  `parroquia` VARCHAR(45) NOT NULL,
  `callePrincipal` VARCHAR(50) NOT NULL,
  `calleSecundaria` VARCHAR(50) NOT NULL,
  `nroCasa` VARCHAR(10) NOT NULL,
  `lugar_referencia` VARCHAR(45) NULL,
  `celularPrincipal` VARCHAR(10) NOT NULL,
  `celularReferencia` VARCHAR(10) NULL,
  `telefonoFijo` VARCHAR(15) NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuario_informacion_contacto_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_informacion_contacto_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`usuario_informacion_financiera`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`usuario_informacion_financiera` (
  `id_usuario` INT NOT NULL,
  `ingreso_mensual` DECIMAL(10,2) NULL DEFAULT 0.00,
  `gasto_mensual_promedio` DECIMAL(10,2) NULL DEFAULT 0.00,
  `gasto_endeudamiento` DECIMAL(5,2) NULL DEFAULT 0.00,
  `patrimonio` DECIMAL(10,2) NULL DEFAULT 0.00,
  `ultima_actualizacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuario_informacion_financiera_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_informacion_financiera_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`usuario_informacion_academica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`usuario_informacion_academica` (
  `id_usuario` INT NOT NULL,
  `ocupacion` VARCHAR(45) NULL,
  `nivel_estudios` VARCHAR(45) NULL,
  `titulo_universitario` VARCHAR(45) NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuario_informacion_academica_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_informacion_academica_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE INDEX `nombre_rol_UNIQUE` (`nombre_rol` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`usuario_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`usuario_roles` (
  `id_usuario_roles` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id_usuario_roles`),
  INDEX `fk_usuario_roles_usuario1_idx` (`id_usuario` ASC) INVISIBLE,
  INDEX `fk_usuario_roles_roles1_idx` (`id_rol` ASC) VISIBLE,
  UNIQUE INDEX `uk_usuario_rol` (`id_usuario` ASC, `id_rol` ASC) INVISIBLE,
  CONSTRAINT `fk_usuario_roles_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_roles_roles1`
    FOREIGN KEY (`id_rol`)
    REFERENCES `cofinance`.`roles` (`id_rol`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`usuario_verificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`usuario_verificacion` (
  `id_verificacion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `estado_identidad` ENUM('Pendiente', 'Aprobado', 'Rechazado') NULL DEFAULT 'Pendiente',
  `estado_domicilio` ENUM('Pendiente', 'Aprobado', 'Rechazado') NULL DEFAULT 'Pendiente',
  `estado_ingresos` ENUM('Pendiente', 'Aprobado', 'Rechazado') NULL,
  `estado_antecedentes` ENUM('Pendiente', 'Aprobado', 'Rechazado') NULL,
  `fecha_solicitud` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_verificacion_identidad` DATETIME NULL,
  `fecha_verificacion_domicilio` DATETIME NULL,
  `fecha_verificacion_ingresos` DATETIME NULL,
  `fecha_verificacion_antecedentes` DATETIME NULL,
  PRIMARY KEY (`id_verificacion`),
  INDEX `fk_usuario_verificacion_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_verificacion_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`documentos_verificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`documentos_verificacion` (
  `id_documento` INT NOT NULL AUTO_INCREMENT,
  `id_verificacion` INT NOT NULL,
  `tipo_documento` ENUM('FOTO_PERSONA', 'ANVERSO_ID', 'REVERSO_ID', 'SERVICIO_BASICO', 'ESTADO_CUENTA_BANCARIO', 'DECLARACION_IMPUESTO', 'ANTECENDENTES_PENALES') NOT NULL,
  `ruta_archivo` VARCHAR(255) NOT NULL,
  `fecha_subida` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_documento`),
  INDEX `fk_documentos_verificacion_usuario_verificacion1_idx` (`id_verificacion` ASC) INVISIBLE,
  INDEX `uk_verificacion_tipo` (`id_verificacion` ASC, `tipo_documento` ASC) VISIBLE,
  CONSTRAINT `fk_documentos_verificacion_usuario_verificacion1`
    FOREIGN KEY (`id_verificacion`)
    REFERENCES `cofinance`.`usuario_verificacion` (`id_verificacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`proyecto_tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`proyecto_tipo` (
  `id_tipo` INT NOT NULL AUTO_INCREMENT,
  `nombre_tipo` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_spanish_ci' NOT NULL,
  PRIMARY KEY (`id_tipo`),
  UNIQUE INDEX `nombre_tipo_UNIQUE` (`nombre_tipo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cofinance`.`proyecto_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`proyecto_categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre_categoria` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE INDEX `uk_nombre_categoria` (`nombre_categoria` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cofinance`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`proyecto` (
  `id_proyecto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `meta_financiera` DECIMAL(15,2) NOT NULL,
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_inicio` DATETIME NULL,
  `id_creador` INT NOT NULL,
  `id_tipo` INT NOT NULL,
  `estado` ENUM('Pendiente', 'Aprobado', 'Rechazado') NULL DEFAULT 'Pendiente',
  `id_categoria` INT NOT NULL,
  PRIMARY KEY (`id_proyecto`),
  INDEX `fk_proyecto_proyecto_tipo1_idx` (`id_tipo` ASC) INVISIBLE,
  INDEX `fk_proyecto_usuario1_idx` (`id_creador` ASC) VISIBLE,
  INDEX `fk_proyecto_categoria_idx` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_proyecto_proyecto_tipo1`
    FOREIGN KEY (`id_tipo`)
    REFERENCES `cofinance`.`proyecto_tipo` (`id_tipo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_proyecto_usuario1`
    FOREIGN KEY (`id_creador`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_proyecto_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `cofinance`.`proyecto_categoria` (`id_categoria`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cofinance`.`proyecto_verificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`proyecto_verificacion` (
  `id_proyecto_verificacion` INT NOT NULL AUTO_INCREMENT,
  `id_proyecto` INT NOT NULL,
  `estado_general` ENUM('Pendiente', 'Aprobado', 'Rechazado') NULL DEFAULT 'Pendiente',
  `fecha_solicitud` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_verificacion` DATETIME NULL,
  PRIMARY KEY (`id_proyecto_verificacion`),
  INDEX `fk_proyecto_verificacion_proyecto1_idx` (`id_proyecto` ASC) VISIBLE,
  CONSTRAINT `fk_proyecto_verificacion_proyecto1`
    FOREIGN KEY (`id_proyecto`)
    REFERENCES `cofinance`.`proyecto` (`id_proyecto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`proyecto_verificacion_documentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`proyecto_verificacion_documentos` (
  `id_documento_proyecto` INT NOT NULL AUTO_INCREMENT,
  `id_proyecto_verificacion` INT NOT NULL,
  `tipo_documento` ENUM('PLAN_NEGOCIO', 'DOCUMENTO_LEGAL', 'OTRO') NOT NULL,
  `ruta_archivo` VARCHAR(255) NOT NULL,
  `fecha_subida` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_documento_proyecto`),
  INDEX `fk_proyecto_verificacion_documentos_proyecto_verificacion1_idx` (`id_proyecto_verificacion` ASC) VISIBLE,
  CONSTRAINT `fk_proyecto_verificacion_documentos_proyecto_verificacion1`
    FOREIGN KEY (`id_proyecto_verificacion`)
    REFERENCES `cofinance`.`proyecto_verificacion` (`id_proyecto_verificacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`proyecto_contribuciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`proyecto_contribuciones` (
  `id_contribucion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_proyecto` INT NOT NULL,
  `monto` DECIMAL(15,2) NOT NULL,
  `fecha_contribucion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contribucion`),
  INDEX `fk_proyecto_contribuciones_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_proyecto_contribuciones_proyecto1_idx` (`id_proyecto` ASC) VISIBLE,
  CONSTRAINT `fk_proyecto_contribuciones_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_proyecto_contribuciones_proyecto1`
    FOREIGN KEY (`id_proyecto`)
    REFERENCES `cofinance`.`proyecto` (`id_proyecto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `cofinance`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`tickets` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `id_usuario_creador` INT NOT NULL,
  `id_usuario_soporte` INT NULL,
  `asunto` TEXT NOT NULL,
  `descripcion` TEXT NOT NULL,
  `estado` ENUM('Abierto', 'En Progreso', 'Resuelto', 'Cerrado', 'Rechazado') NULL DEFAULT 'Abierto',
  `prioridad` ENUM('Baja', 'Media', 'Alta', 'Urgente') NULL DEFAULT 'Baja',
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_cierre` DATETIME NULL,
  PRIMARY KEY (`id_ticket`),
  INDEX `idx_usuario_creador` (`id_usuario_creador` ASC) INVISIBLE,
  INDEX `idx_usuario_soporte` (`id_usuario_soporte` ASC) VISIBLE,
  CONSTRAINT `fk_tickets_usuario_creador`
    FOREIGN KEY (`id_usuario_creador`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_usuario_soporte`
    FOREIGN KEY (`id_usuario_soporte`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cofinance`.`ticket_mensajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`ticket_mensajes` (
  `id_mensaje` INT NOT NULL,
  `id_ticket` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `mensaje` TEXT NOT NULL,
  `fecha_envio` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_mensaje`),
  INDEX `idx_ticket` (`id_ticket` ASC) INVISIBLE,
  INDEX `idx_usuario` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_ticket_mensajes_ticket`
    FOREIGN KEY (`id_ticket`)
    REFERENCES `cofinance`.`tickets` (`id_ticket`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_mensajes_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cofinance`.`notificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`notificaciones` (
  `id_notificacion` INT NOT NULL AUTO_INCREMENT,
  `tipo_origen` ENUM('proyecto', 'proyecto_contribuciones', 'proyecto_verificacion', 'documentos_verificacion', 'usuario_verificacion', 'tickets', 'ticket_mensajes', 'otro') NOT NULL,
  `id_origen` INT NOT NULL,
  `titulo` VARCHAR(100) NULL,
  `mensaje` TEXT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo_notificacion` ENUM('Automatica', 'Manual') NOT NULL DEFAULT 'Automatica',
  PRIMARY KEY (`id_notificacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cofinance`.`notificaciones_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cofinance`.`notificaciones_usuarios` (
  `id_notificacion` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `leido` TINYINT(1) NOT NULL DEFAULT 0,
  `fecha_lectura` DATETIME NULL,
  PRIMARY KEY (`id_notificacion`, `id_usuario`),
  INDEX `fk_notificaciones_usuarios_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_notificaciones_usuarios_notificacion`
    FOREIGN KEY (`id_notificacion`)
    REFERENCES `cofinance`.`notificaciones` (`id_notificacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_notificaciones_usuarios_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `cofinance`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
