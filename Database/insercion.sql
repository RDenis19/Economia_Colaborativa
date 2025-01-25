-- ========================
-- 1. Insertar Roles
-- ========================
INSERT INTO cofinance.roles (nombre_rol)
VALUES 
    ('administrador'),
    ('creador'),
    ('usuario'),
    ('soporte');

-- ========================
-- 2. Insertar Usuarios
-- ========================
-- 2.1 Usuario Administrador
INSERT INTO cofinance.usuario (usuario, correo, contraseña)
VALUES ('admin', 'admin@cofinance.com', MD5('admin123'));

-- 2.2 Usuario Soporte
INSERT INTO cofinance.usuario (usuario, correo, contraseña)
VALUES ('soporte', 'soporte@cofinance.com', MD5('soporte123'));

-- 2.3 Usuarios Creadores (4)
INSERT INTO cofinance.usuario (usuario, correo, contraseña)
VALUES 
    ('creador1', 'creador1@cofinance.com', MD5('creador1')),
    ('creador2', 'creador2@cofinance.com', MD5('creador2')),
    ('creador3', 'creador3@cofinance.com', MD5('creador3')),
    ('creador4', 'creador4@cofinance.com', MD5('creador4'));

-- 2.4 Usuarios (4)
INSERT INTO cofinance.usuario (usuario, correo, contraseña)
VALUES 
    ('usuario1', 'usuario1@cofinance.com', MD5('usuario1')),
    ('usuario2', 'usuario2@cofinance.com', MD5('usuario2')),
    ('usuario3', 'usuario3@cofinance.com', MD5('usuario3')),
    ('usuario4', 'usuario4@cofinance.com', MD5('usuario4'));

-- ========================
-- 3. Asignar Roles a Usuarios
-- ========================

-- Administrador
INSERT INTO cofinance.usuario_roles (id_usuario, id_rol)
SELECT u.idusuario, r.id_rol
FROM cofinance.usuario u
JOIN cofinance.roles r
  ON r.nombre_rol = 'administrador'
WHERE u.usuario = 'admin';

-- Soporte
INSERT INTO cofinance.usuario_roles (id_usuario, id_rol)
SELECT u.idusuario, r.id_rol
FROM cofinance.usuario u
JOIN cofinance.roles r
  ON r.nombre_rol = 'soporte'
WHERE u.usuario = 'soporte';

-- Creadores
INSERT INTO cofinance.usuario_roles (id_usuario, id_rol)
SELECT u.idusuario, r.id_rol
FROM cofinance.usuario u
JOIN cofinance.roles r
  ON r.nombre_rol = 'creador'
WHERE u.usuario IN ('creador1','creador2','creador3','creador4');

-- Usuarios
INSERT INTO cofinance.usuario_roles (id_usuario, id_rol)
SELECT u.idusuario, r.id_rol
FROM cofinance.usuario u
JOIN cofinance.roles r
  ON r.nombre_rol = 'usuario'
WHERE u.usuario IN ('usuario1','usuario2','usuario3','usuario4');
