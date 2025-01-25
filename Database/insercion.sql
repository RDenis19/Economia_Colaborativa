-- ==========================================
-- USO DEL ESQUEMA
-- ==========================================
USE `cofinance`;

-- ==========================================
-- INSERTS EN UN SOLO BLOQUE
-- ==========================================

-- 1) ROLES (Administrador, Soporte, Creador, Patrocinador, Donante, Inversor)
-- Asegúrate de tener la columna 'descripcion' en la tabla 'roles'.
ALTER TABLE `roles`
ADD COLUMN IF NOT EXISTS `descripcion` VARCHAR(255) NOT NULL DEFAULT '' AFTER `nombre_rol`;

INSERT INTO `roles` (nombre_rol, descripcion)
VALUES
('Administrador', 'Administradores de la plataforma'),
('Soporte', 'Verificar documentos de usuario y proyectos, dar soporte a usuarios'),
('Creador', 'Usuarios que crean proyectos'),
('Patrocinador', 'Usuarios que patrocinan proyectos de recompensas'),
('Donante', 'Usuarios que realizan donaciones'),
('Inversor', 'Usuarios que invierten en crowdlending y equity crowdfunding');

-- 2) USUARIOS
INSERT INTO `usuario` (usuario, correo, contraseña)
VALUES
('admin01',       'admin01@example.com',     'hashed_pwd1'),
('soporte01',     'soporte01@example.com',   'hashed_pwd2'),
('creador01',     'creador01@example.com',   'hashed_pwd3'),
('patrocinador01','patro01@example.com',     'hashed_pwd4'),
('donante01',     'donante01@example.com',   'hashed_pwd5'),
('inversor01',    'inversor01@example.com',  'hashed_pwd6');

-- Suponiendo genera idusuario=1..6

-- 3) ASIGNACIÓN DE ROLES A USUARIOS (usuario_roles)
-- Supongamos que los roles generaron id_rol=1..6 en el mismo orden que se insertaron.
-- Y los usuarios generaron id_usuario=1..6 en el orden anterior.
INSERT INTO `usuario_roles` (id_usuario, id_rol)
VALUES
(1, 1), -- user1=admin01 => Administrador
(2, 2), -- user2=soporte01 => Soporte
(3, 3), -- user3=creador01 => Creador
(4, 4), -- user4=patrocinador01 => Patrocinador
(5, 5), -- user5=donante01 => Donante
(6, 6); -- user6=inversor01 => Inversor

-- 4) DATOS DE USUARIO: PERSONAL
INSERT INTO `usuario_informacion_personal`
  (id_usuario, nombres, apellidos, fecha_nacimiento, identificacion, genero)
VALUES
(1, 'Carlos',   'Andrade', '1985-04-10', '0912345678', 'M'),
(2, 'Sofia',    'Mendez',  '1990-09-15', '0923456789', 'F'),
(3, 'Juan',     'Perez',   '1988-01-23', '0934567890', 'M'),
(4, 'Pedro',    'Gonzalez','1987-12-01', '0945678123', 'M'),
(5, 'Lucia',    'Torres',  '1993-07-07', '0956789123', 'F'),
(6, 'Dario',    'Mora',    '1989-03-19', '0967890123', 'M');

-- 5) DATOS DE USUARIO: CONTACTO
INSERT INTO `usuario_informacion_contacto`
  (id_usuario, provincia, canton, parroquia, callePrincipal, calleSecundaria, nroCasa, lugar_referencia, celularPrincipal)
VALUES
(1, 'Pichincha','Quito','Centro','Av. Amazonas','Av. América','123','Cerca del parque','0981111111'),
(2, 'Guayas','Guayaquil','Norte','Av. Americas','Calle 10','456','Junto al mall','0992222222'),
(3, 'Azuay','Cuenca','El Sagrario','Calle Larga','Hermano Miguel','12-34','Diagonal a la iglesia','0993333333'),
(4, 'Manabí','Manta','Tarqui','Vía Barbasquillo','Calle 13','56-78','Cerca del malecón','0994444444'),
(5, 'Loja','Loja','Central','Av. Universitaria','Calle Loja','101','Junto al parque central','0995555555'),
(6, 'El Oro','Machala','Sur','Calle Bolívar','Calle Sucre','77','Frente al mercado','0996666666');

-- 6) DATOS DE USUARIO: FINANCIERA
INSERT INTO `usuario_informacion_financiera`
  (id_usuario, ingreso_mensual, gasto_mensual_promedio, gasto_endeudamiento, patrimonio)
VALUES
(1, 2000.00, 1200.00, 20.00,  5000.00),
(2, 1500.00, 700.00,  30.00,  3000.00),
(3, 2500.00, 1000.00, 25.00, 10000.00),
(4, 3000.00, 1500.00, 25.00, 8000.00),
(5, 1000.00, 400.00,  20.00, 2000.00),
(6, 4000.00, 2000.00, 20.00, 15000.00);

-- 7) DATOS DE USUARIO: ACADEMICA
INSERT INTO `usuario_informacion_academica`
  (id_usuario, ocupacion, nivel_estudios, titulo_universitario)
VALUES
(1, 'Administrador de Sistemas','Superior','Ingeniería Informática'),
(2, 'Especialista en Soporte','Superior','Ingeniería en Redes'),
(3, 'Emprendedor','Bachiller','N/A'),
(4, 'Patrocinador de Startups','Superior','Economía'),
(5, 'Donador Freelance','Bachiller','N/A'),
(6, 'Analista Financiero','Superior','Economía');

-- 8) VERIFICACION DE USUARIO
INSERT INTO `usuario_verificacion`
  (id_usuario, estado_identidad, estado_domicilio, estado_ingresos, estado_antecedentes)
VALUES
(1, 'Aprobado','Aprobado','Pendiente','Pendiente'),
(2, 'Pendiente','Pendiente','Pendiente','Pendiente'),
(3, 'Pendiente','Pendiente','Pendiente','Pendiente'),
(4, 'Pendiente','Aprobado','Pendiente','Pendiente'),
(5, 'Aprobado','Pendiente','Pendiente','Pendiente'),
(6, 'Aprobado','Aprobado','Aprobado','Pendiente');

-- 9) DOCUMENTOS_VERIFICACION
-- Asumimos generará id_verificacion=1..6 para el insert previo, en el orden de usuarios
-- Ajusta si la PK autoincrement difiere
INSERT INTO `documentos_verificacion`
  (id_verificacion, tipo_documento, ruta_archivo)
VALUES
(1, 'FOTO_PERSONA', '/docs/user1/foto.jpg'),
(1, 'ANVERSO_ID',   '/docs/user1/id_anverso.jpg'),
(1, 'REVERSO_ID',   '/docs/user1/id_reverso.jpg'),
(6, 'ESTADO_CUENTA_BANCARIO','/docs/user6/cuenta.pdf'),
(6, 'DECLARACION_IMPUESTO',  '/docs/user6/impuesto.pdf');

-- 10) PROYECTO_TIPO
INSERT INTO `proyecto_tipo` (nombre_tipo)
VALUES
('Recompensas'),
('Donaciones'),
('Crowdlending'),
('Equity');

-- 11) PROYECTO_CATEGORIA
INSERT INTO `proyecto_categoria` (nombre_categoria)
VALUES
('Tecnología'),
('Salud'),
('Educación'),
('Arte');

-- 12) PROYECTO
-- Asumimos id_creador=3 => creador01, id_tipo=2 => Donaciones, etc.
INSERT INTO `proyecto`
  (nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, estado, id_categoria)
VALUES
('Aplicación de Donaciones','App para ONGs',5000.00,'2025-01-01',3,2,'Pendiente',1),
('Curso de Programación','Cursos en línea',10000.00,'2025-02-01',1,1,'Pendiente',3),
('Clínica Móvil Rural','Clínica móvil para zonas rurales',8000.00,'2025-03-10',3,3,'Pendiente',2);

-- 13) PROYECTO_VERIFICACION
INSERT INTO `proyecto_verificacion`
  (id_proyecto, estado_general)
VALUES
(1,'Pendiente'),
(2,'Pendiente'),
(3,'Pendiente');

-- 14) PROYECTO_VERIFICACION_DOCUMENTOS
INSERT INTO `proyecto_verificacion_documentos`
  (id_proyecto_verificacion, tipo_documento, ruta_archivo)
VALUES
(1,'PLAN_NEGOCIO','/docs/proyectos/1/plan.pdf'),
(1,'DOCUMENTO_LEGAL','/docs/proyectos/1/legal.pdf'),
(2,'OTRO','/docs/proyectos/2/extra.pdf');

-- 15) PROYECTO_CONTRIBUCIONES
-- inversor01 (user6) aporta $50 al proyecto #1
INSERT INTO `proyecto_contribuciones`
  (id_usuario, id_proyecto, monto)
VALUES
(6,1,50.00),
-- soporte01 (user2) aporta $30 al proyecto #1
(2,1,30.00),
-- admin01 (user1) aporta $100 al proyecto #3
(1,3,100.00);

-- 16) TICKETS
-- user3 (creador01) crea ticket asignado a user2 (soporte01)
INSERT INTO `tickets`
  (id_usuario_creador, id_usuario_soporte, asunto, descripcion, estado, prioridad)
VALUES
(3, 2, 'Problema con aportes','No veo mis aportes reflejados.', 'Abierto','Media'),
-- user4 (patrocinador01) crea ticket sin asignar => null en id_usuario_soporte
(4, NULL, 'Duda con patrocinio','¿Cómo patrocino un proyecto?', 'Abierto','Baja');

-- 17) TICKET_MENSAJES
INSERT INTO `ticket_mensajes`
  (id_mensaje, id_ticket, id_usuario, mensaje)
VALUES
(1,1,3,'Hola, no veo mis aportes.'),
(2,1,2,'Revisaré tus transacciones.'),
(3,2,4,'¿Cómo patrocino el proyecto adecuadamente?');

-- 18) NOTIFICACIONES (Principal)
INSERT INTO `notificaciones`
  (tipo_origen, id_origen, titulo, mensaje, tipo_notificacion)
VALUES
('tickets', 1, 'Nuevo Ticket #1', 'Se creó ticket #1 (Problema aportes)', 'Automatica'),
('otro', 0, 'Anuncio Global', 'Bienvenidos a la plataforma COFINANCE', 'Manual');

-- 19) NOTIFICACIONES_USUARIOS (M:N)
-- Notificación #1 => tickets(1) para user2=soporte01 y user3=creador01
INSERT INTO `notificaciones_usuarios`
  (id_notificacion, id_usuario, leido)
VALUES
(1,2,0),  -- Soporte
(1,3,0);  -- Creador

-- Asignar la notificación #2 (Anuncio Global) a TODOS los usuarios
INSERT INTO `notificaciones_usuarios`
  (id_notificacion, id_usuario, leido)
SELECT 2, u.idusuario, 0
FROM `usuario` u;

-- ==========================================
-- FIN DEL BLOQUE DE INSERT
-- ==========================================
