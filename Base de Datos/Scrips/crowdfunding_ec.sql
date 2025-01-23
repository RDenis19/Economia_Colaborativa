-- ================================================
-- 1. Creación de la Base de Datos
-- ================================================
CREATE DATABASE IF NOT EXISTS crowdfunding_ec;
USE crowdfunding_ec;

-- ================================================
-- 2. Tabla de Roles de Usuario
-- ================================================
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
) ENGINE=InnoDB;

-- Insertar roles predeterminados
INSERT INTO roles (nombre, descripcion) VALUES
('Creador', 'Usuarios que crean proyectos'),
('Patrocinador', 'Usuarios que patrocinan proyectos de recompensas'),
('Donante', 'Usuarios que realizan donaciones'),
('Inversor', 'Usuarios que invierten en crowdlending y equity crowdfunding'),
('Administrador', 'Administradores de la plataforma');

-- ================================================
-- 3. Tabla de Usuarios
-- ================================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) NOT NULL UNIQUE, -- Cédula de identidad ecuatoriana
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL, -- Almacenar contraseñas en formato hash seguro
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    rol_id INT NOT NULL,
    verificado BOOLEAN DEFAULT FALSE,
    fecha_verificacion DATETIME NULL,
    direccion VARCHAR(255) NULL,
    provincia VARCHAR(100) NULL,
    ciudad VARCHAR(100) NULL,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 4. Tabla de Categorías de Proyectos
-- ================================================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
) ENGINE=InnoDB;

-- ================================================
-- 5. Tabla de Tipos de Crowdfunding
-- ================================================
CREATE TABLE tipos_crowdfunding (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Insertar tipos de crowdfunding
INSERT INTO tipos_crowdfunding (nombre, descripcion) VALUES
('Recompensas', 'Financiación a cambio de recompensas no monetarias'),
('Donaciones', 'Aportaciones para causas benéficas sin recompensa'),
('Crowdlending', 'Préstamos colectivos con retorno de capital e intereses'),
('Equity', 'Inversiones a cambio de participación accionaria');

-- ================================================
-- 6. Tabla de Proyectos
-- ================================================
CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    meta_financiera DECIMAL(15,2) NOT NULL, -- En USD
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    estado ENUM('Activo', 'Exitoso', 'Fallido', 'Cancelado') DEFAULT 'Activo',
    usuario_id INT NOT NULL, -- Creador del proyecto
    categoria_id INT,
    tipo_crowdfunding_id INT NOT NULL,
    verificado BOOLEAN DEFAULT FALSE,
    fecha_verificacion DATETIME NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (tipo_crowdfunding_id) REFERENCES tipos_crowdfunding(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 7. Tabla de Transacciones Financieras
-- ================================================
CREATE TABLE transacciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    usuario_id INT NOT NULL, -- Usuario que realiza la transacción
    tipo_transaccion ENUM('Patrocinio', 'Donación', 'Préstamo', 'Inversión') NOT NULL,
    monto DECIMAL(15,2) NOT NULL, -- En USD
    fecha_transaccion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Pendiente', 'Completada', 'Fallida') DEFAULT 'Pendiente',
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 8. Tabla de Recompensas
-- ================================================
CREATE TABLE recompensas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    monto_minimo DECIMAL(15,2) NOT NULL, -- En USD
    cantidad_disponible INT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 9. Tabla de Donaciones
-- ================================================
CREATE TABLE donaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    monto DECIMAL(15,2) NOT NULL, -- En USD
    fecha_donacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 10. Tabla de Préstamos (Crowdlending)
-- ================================================
CREATE TABLE prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    usuario_id INT NOT NULL, -- Inversor
    monto_prestado DECIMAL(15,2) NOT NULL, -- En USD
    tasa_interes DECIMAL(5,2) NOT NULL, -- Porcentaje anual
    fecha_prestamo DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento DATETIME NOT NULL,
    estado ENUM('Activo', 'Pagado', 'Default') DEFAULT 'Activo',
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 11. Tabla de Inversiones en Equity Crowdfunding
-- ================================================
CREATE TABLE inversiones_equity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    usuario_id INT NOT NULL, -- Inversor
    monto_invertido DECIMAL(15,2) NOT NULL, -- En USD
    porcentaje_acciones DECIMAL(5,2) NOT NULL,
    fecha_inversion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 12. Tabla de Participaciones Accionarias
-- ================================================
CREATE TABLE participaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    porcentaje DECIMAL(5,2) NOT NULL,
    fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 13. Tabla de Comentarios y Feedback
-- ================================================
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    comentario TEXT NOT NULL,
    fecha_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 14. Tabla de Transacciones de Recompensas
-- ================================================
CREATE TABLE transacciones_recompensas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaccion_id INT NOT NULL,
    recompensa_id INT NOT NULL,
    cantidad INT DEFAULT 1,
    FOREIGN KEY (transaccion_id) REFERENCES transacciones(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (recompensa_id) REFERENCES recompensas(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 15. Tabla de Configuraciones de la Plataforma
-- ================================================
CREATE TABLE configuraciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(100) NOT NULL UNIQUE,
    valor VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
) ENGINE=InnoDB;

-- ================================================
-- 16. Tablas de Verificación
-- ================================================

-- 16.1. Tabla de Verificaciones de Usuarios (Creadores de Proyectos)
CREATE TABLE verificaciones_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_verificacion ENUM('Identidad', 'Financiera', 'Credibilidad') NOT NULL,
    estado ENUM('Pendiente', 'Aprobada', 'Rechazada') DEFAULT 'Pendiente',
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_verificacion DATETIME NULL,
    documento_ruta VARCHAR(255) NULL, -- Ruta al documento subido para verificación
    comentarios VARCHAR(255) NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 16.2. Tabla de Verificaciones de Proyectos
CREATE TABLE verificaciones_proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    tipo_verificacion ENUM('Legitimidad', 'Legal', 'Objetivos') NOT NULL,
    estado ENUM('Pendiente', 'Aprobada', 'Rechazada') DEFAULT 'Pendiente',
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_verificacion DATETIME NULL,
    documento_ruta VARCHAR(255) NULL, -- Ruta al documento subido para verificación
    comentarios VARCHAR(255) NULL,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================================
-- 17. Índices Adicionales para Optimización
-- ================================================

-- Índices para optimizar consultas de proyectos
CREATE INDEX idx_proyecto_tipo ON proyectos(tipo_crowdfunding_id);
CREATE INDEX idx_proyecto_categoria ON proyectos(categoria_id);

-- Índices para optimizar consultas de transacciones
CREATE INDEX idx_transaccion_usuario ON transacciones(usuario_id);
CREATE INDEX idx_transaccion_proyecto ON transacciones(proyecto_id);

-- Índices para optimizar consultas de recompensas
CREATE INDEX idx_recompensa_proyecto ON recompensas(proyecto_id);

-- Índices para optimizar consultas de donaciones
CREATE INDEX idx_donacion_proyecto ON donaciones(proyecto_id);

-- Índices para optimizar consultas de préstamos
CREATE INDEX idx_prestamo_proyecto ON prestamos(proyecto_id);

-- Índices para optimizar consultas de inversiones en equity
CREATE INDEX idx_inversion_equity_proyecto ON inversiones_equity(proyecto_id);

-- Índices para optimizar consultas de comentarios
CREATE INDEX idx_comentarios_proyecto ON comentarios(proyecto_id);

-- Índices para optimizar consultas de transacciones_recompensas
CREATE INDEX idx_transacciones_recompensas_transaccion ON transacciones_recompensas(transaccion_id);
CREATE INDEX idx_transacciones_recompensas_recompensa ON transacciones_recompensas(recompensa_id);

-- Índices para optimizar consultas de verificaciones de usuarios
CREATE INDEX idx_verificaciones_usuarios_estado ON verificaciones_usuarios(estado);
CREATE INDEX idx_verificaciones_usuarios_usuario ON verificaciones_usuarios(usuario_id);

-- Índices para optimizar consultas de verificaciones de proyectos
CREATE INDEX idx_verificaciones_proyectos_estado ON verificaciones_proyectos(estado);
CREATE INDEX idx_verificaciones_proyectos_proyecto ON verificaciones_proyectos(proyecto_id);

-- Índices para la Tabla de Configuraciones
CREATE INDEX idx_configuraciones_clave ON configuraciones(clave);

-- ================================================
-- 18. Triggers para Automatización de Verificaciones
-- ================================================

-- 18.1. Trigger para verificar usuarios automáticamente
DELIMITER $$

CREATE TRIGGER trg_after_verificacion_usuario
AFTER UPDATE ON verificaciones_usuarios
FOR EACH ROW
BEGIN
    -- Declaraciones deben estar al inicio del bloque
    DECLARE total INT;
    DECLARE aprobadas INT;

    IF NEW.estado = 'Aprobada' THEN
        -- Contar todas las verificaciones del usuario
        SELECT COUNT(*) INTO total
        FROM verificaciones_usuarios
        WHERE usuario_id = NEW.usuario_id;

        -- Contar las verificaciones aprobadas del usuario
        SELECT COUNT(*) INTO aprobadas
        FROM verificaciones_usuarios
        WHERE usuario_id = NEW.usuario_id AND estado = 'Aprobada';

        -- Si todas las verificaciones están aprobadas, marcar al usuario como verificado
        IF total = aprobadas THEN
            UPDATE usuarios
            SET verificado = TRUE,
                fecha_verificacion = NOW()
            WHERE id = NEW.usuario_id;
        END IF;
    END IF;
END$$

DELIMITER ;

-- 18.2. Trigger para verificar proyectos automáticamente
DELIMITER $$

CREATE TRIGGER trg_after_verificacion_proyecto
AFTER UPDATE ON verificaciones_proyectos
FOR EACH ROW
BEGIN
    -- Declaraciones deben estar al inicio del bloque
    DECLARE total INT;
    DECLARE aprobadas INT;

    IF NEW.estado = 'Aprobada' THEN
        -- Contar todas las verificaciones del proyecto
        SELECT COUNT(*) INTO total
        FROM verificaciones_proyectos
        WHERE proyecto_id = NEW.proyecto_id;

        -- Contar las verificaciones aprobadas del proyecto
        SELECT COUNT(*) INTO aprobadas
        FROM verificaciones_proyectos
        WHERE proyecto_id = NEW.proyecto_id AND estado = 'Aprobada';

        -- Si todas las verificaciones están aprobadas, marcar el proyecto como verificado
        IF total = aprobadas THEN
            UPDATE proyectos
            SET verificado = TRUE,
                fecha_verificacion = NOW()
            WHERE id = NEW.proyecto_id;
        END IF;
    END IF;
END$$

DELIMITER ;

-- ================================================
-- 19. Ejemplos de Inserción de Datos
-- ================================================

-- 19.1. Crear un usuario creador
INSERT INTO usuarios (nombre, apellido, cedula, email, contraseña, rol_id, direccion, provincia, ciudad) VALUES
('Juan', 'Pérez', '0912345678', 'juan.perez@example.ec', 'hashed_password', 1, 'Av. Amazonas 123', 'Pichincha', 'Quito');

-- 19.2. Crear una categoría
INSERT INTO categorias (nombre, descripcion) VALUES
('Tecnología', 'Proyectos relacionados con avances tecnológicos');

-- 19.3. Crear un proyecto de recompensas
INSERT INTO proyectos (titulo, descripcion, meta_financiera, fecha_inicio, fecha_fin, usuario_id, categoria_id, tipo_crowdfunding_id) VALUES
('Desarrollo de Gadget X', 'Un gadget innovador que revolucionará el mercado.', 50000.00, '2025-02-01 00:00:00', '2025-04-01 00:00:00', 1, 1, 1);

-- 19.4. Crear recompensas para el proyecto
INSERT INTO recompensas (proyecto_id, descripcion, monto_minimo, cantidad_disponible) VALUES
(1, 'Gadget X - Edición Limitada', 100.00, 100),
(1, 'Gadget X - Edición Especial con Accesorios', 200.00, 50);

-- 19.5. Crear un usuario patrocinador
INSERT INTO usuarios (nombre, apellido, cedula, email, contraseña, rol_id, direccion, provincia, ciudad) VALUES
('María', 'Gómez', '0923456789', 'maria.gomez@example.ec', 'hashed_password', 2, 'Calle Principal 456', 'Guayas', 'Guayaquil');

-- 19.6. Realizar una transacción de patrocinio
INSERT INTO transacciones (proyecto_id, usuario_id, tipo_transaccion, monto, estado) VALUES
(1, 2, 'Patrocinio', 150.00, 'Completada');

-- 19.7. Asociar la transacción con una recompensa
INSERT INTO transacciones_recompensas (transaccion_id, recompensa_id, cantidad) VALUES
(1, 1, 1);

-- 19.8. Solicitar verificación de identidad para el usuario creador
INSERT INTO verificaciones_usuarios (usuario_id, tipo_verificacion, documento_ruta) VALUES
(1, 'Identidad', '/documentos/verificaciones/usuario1_identidad.pdf');

-- 19.9. Solicitar verificación legal para el proyecto
INSERT INTO verificaciones_proyectos (proyecto_id, tipo_verificacion, documento_ruta) VALUES
(1, 'Legal', '/documentos/verificaciones/proyecto1_legal.pdf');

-- ================================================
-- 20. Consideraciones Adicionales
-- ================================================

-- 20.1. Seguridad de las Contraseñas
-- Asegúrate de almacenar las contraseñas utilizando técnicas de hashing seguro, como bcrypt, en lugar de almacenarlas en texto plano.

-- 20.2. Gestión de Documentos
-- Las rutas de los documentos (documento_ruta) deben manejarse de manera segura, almacenando los archivos en ubicaciones protegidas y asegurando que solo usuarios autorizados puedan acceder a ellos.

-- 20.3. Validaciones y Triggers Adicionales
-- Considera implementar validaciones adicionales y triggers para mantener la integridad de los datos, como actualizar el estado de un proyecto cuando se alcanza la meta financiera.

-- 20.4. Optimización de Consultas
-- Revisa y ajusta los índices según el uso real de la base de datos para optimizar el rendimiento.

-- 20.5. Backups y Recuperación
-- Implementa estrategias de respaldo regulares para proteger los datos ante posibles fallos.

-- 20.6. Cumplimiento Normativo
-- Asegúrate de que la base de datos cumple con las normativas de protección de datos aplicables en Ecuador, como la Ley Orgánica de Protección de Datos Personales.

-- ================================================
-- 21. Resumen
-- ================================================

-- Este script crea una base de datos adaptada al contexto de Ecuador para gestionar un sistema de crowdfunding que soporta múltiples tipos de financiación colectiva.
-- Incluye la gestión de usuarios con diferentes roles, proyectos categorizados y verificados, transacciones financieras detalladas en USD, y mecanismos de verificación para asegurar la integridad y confianza en la plataforma.
-- Además, se han incorporado campos específicos como la cédula de identidad y la dirección de los usuarios para alinearse con las prácticas y regulaciones locales.

-- Asegúrate de personalizar y extender este diseño según las necesidades específicas de tu proyecto, considerando aspectos como:
-- - Integración con pasarelas de pago locales.
-- - Gestión de impuestos y retenciones conforme a la legislación ecuatoriana.
-- - Soporte para múltiples idiomas si es necesario.
-- - Implementación de medidas adicionales de seguridad y privacidad.

-- Si necesitas implementar funcionalidades adicionales o tienes alguna duda específica sobre alguna parte del script, no dudes en preguntar.
