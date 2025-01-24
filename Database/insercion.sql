-- ==============================
-- INICIO: INSERTS GLOBALES
-- ==============================

-- 1) Roles
INSERT INTO `cofinance`.`roles` (nombre_rol) VALUES 
('Administrador'),
('Soporte'),
('Creador'),
('Inversor');

-- 2) Usuarios
INSERT INTO `cofinance`.`usuario` (usuario, correo, contraseña) VALUES
('admin01',    'admin01@example.com',    'hashed_pwd1'),
('soporte01',  'soporte01@example.com',  'hashed_pwd2'),
('creador01',  'creador01@example.com',  'hashed_pwd3'),
('inversor01', 'inversor01@example.com', 'hashed_pwd4');

-- 3) usuario_roles
INSERT INTO `cofinance`.`usuario_roles` (id_usuario, id_rol) VALUES
(1, 1), -- admin01 => Administrador
(2, 2), -- soporte01 => Soporte
(3, 3), -- creador01 => Creador
(4, 4); -- inversor01 => Inversor

-- 4) usuario_informacion_personal
INSERT INTO `cofinance`.`usuario_informacion_personal`
    (id_usuario, nombres, apellidos, fecha_nacimiento, identificacion, genero)
VALUES
(1, 'Carlos', 'Andrade', '1985-04-10', '0912345678', 'M'),
(2, 'Sofia',  'Mendez',  '1990-09-15', '0923456789', 'F'),
(3, 'Juan',   'Perez',   '1988-01-23', '0934567890', 'M'),
(4, 'Maria',  'Lopez',   '1992-06-05', '0945678901', 'F');

-- 5) usuario_informacion_contacto
INSERT INTO `cofinance`.`usuario_informacion_contacto`
    (id_usuario, provincia, canton, parroquia, callePrincipal, calleSecundaria, nroCasa, lugar_referencia, celularPrincipal)
VALUES
(1, 'Pichincha','Quito',     'Centro', 'Av. Amazonas', 'Av. América',  '123', 'Cerca del parque', '0981111111'),
(2, 'Guayas',   'Guayaquil', 'Norte',  'Av. Americas', 'Calle 10',     '456', 'Junto al mall',    '0992222222'),
(3, 'Azuay',    'Cuenca',    'El Sagrario','Calle Larga','Hermano Miguel','12-34','Diagonal a la iglesia','0993333333'),
(4, 'Manabí',   'Manta',     'Tarqui', 'Vía Barbasquillo','Calle 13','56-78','Cerca del malecón','0994444444');

-- 6) usuario_informacion_financiera
INSERT INTO `cofinance`.`usuario_informacion_financiera`
    (id_usuario, ingreso_mensual, gasto_mensual_promedio, gasto_endeudamiento, patrimonio)
VALUES
(1, 2000.00, 1200.00, 20.00,  5000.00),
(2, 1500.00, 700.00,  30.00,  3000.00),
(3, 2500.00, 1000.00, 25.00, 10000.00),
(4, 4000.00, 2000.00, 20.00, 15000.00);

-- 7) usuario_informacion_academica
INSERT INTO `cofinance`.`usuario_informacion_academica`
    (id_usuario, ocupacion, nivel_estudios, titulo_universitario)
VALUES
(1, 'Administrador de Sistemas','Superior','Ingeniería Informática'),
(2, 'Especialista en Soporte',  'Superior','Ingeniería en Redes'),
(3, 'Emprendedor',             'Bachiller','N/A'),
(4, 'Analista Financiero',     'Superior','Economía');

-- 8) usuario_verificacion
INSERT INTO `cofinance`.`usuario_verificacion`
    (id_usuario, estado_identidad, estado_domicilio, estado_ingresos, estado_antecedentes)
VALUES
(1, 'Aprobado','Aprobado','Pendiente','Pendiente'),
(2, 'Pendiente','Pendiente','Pendiente','Pendiente'),
(3, 'Pendiente','Pendiente','Pendiente','Pendiente'),
(4, 'Aprobado','Aprobado','Aprobado','Pendiente');

-- 9) documentos_verificacion
INSERT INTO `cofinance`.`documentos_verificacion`
    (id_verificacion, tipo_documento, ruta_archivo)
VALUES
(1, 'FOTO_PERSONA',  '/docs/user1/foto.jpg'),
(1, 'ANVERSO_ID',    '/docs/user1/id_anverso.jpg'),
(1, 'REVERSO_ID',    '/docs/user1/id_reverso.jpg'),
(4, 'ESTADO_CUENTA_BANCARIO','/docs/user4/cuenta.pdf'),
(4, 'DECLARACION_IMPUESTO',  '/docs/user4/impuesto.pdf');

-- 10) proyecto_tipo
INSERT INTO `cofinance`.`proyecto_tipo` (nombre_tipo) VALUES
('Recompensas'),
('Donaciones'),
('Crowdlending'),
('Equity');

-- 11) proyecto_categoria
INSERT INTO `cofinance`.`proyecto_categoria` (nombre_categoria) VALUES
('Tecnología'),
('Salud'),
('Educación'),
('Arte');

-- 12) proyecto
INSERT INTO `cofinance`.`proyecto`
    (nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, estado, id_categoria)
VALUES
('Aplicación de Donaciones','App para ONGs',5000.00,'2025-01-01 00:00:00',3,2,'Pendiente',1),
('Curso de Programación',   'Cursos en línea',10000.00,'2025-02-01 00:00:00',1,1,'Pendiente',3),
('Clínica Móvil Rural',     'Clínica móvil',  8000.00, '2025-03-10 00:00:00',3,3,'Pendiente',2);

-- 13) proyecto_verificacion
INSERT INTO `cofinance`.`proyecto_verificacion`
    (id_proyecto, estado_general)
VALUES
(1, 'Pendiente'),
(2, 'Pendiente'),
(3, 'Pendiente');

-- 14) proyecto_verificacion_documentos
INSERT INTO `cofinance`.`proyecto_verificacion_documentos`
    (id_proyecto_verificacion, tipo_documento, ruta_archivo)
VALUES
(1, 'PLAN_NEGOCIO', '/docs/proyectos/1/plan.pdf'),
(1, 'DOCUMENTO_LEGAL','/docs/proyectos/1/legal.pdf'),
(2, 'OTRO','/docs/proyectos/2/extra.pdf');

-- 15) proyecto_contribuciones
INSERT INTO `cofinance`.`proyecto_contribuciones`
    (id_usuario, id_proyecto, monto)
VALUES
(4,1,50.00),   -- inversor01 aporta $50 al proyecto #1
(2,1,30.00),   -- soporte01 aporta $30 al proyecto #1
(1,3,100.00);  -- admin01 aporta $100 al proyecto #3

-- 16) tickets
INSERT INTO `cofinance`.`tickets`
    (id_usuario_creador, id_usuario_soporte, asunto, descripcion, estado, prioridad)
VALUES
(3, 2, 'Problema con aportes','No veo mis aportes.', 'Abierto','Media'),
(4, NULL,'Duda Crowdlending', '¿Cómo calculan intereses?','Abierto','Baja');

-- 17) ticket_mensajes
-- Observa que id_mensaje no es autoincrement, se establece manual
INSERT INTO `cofinance`.`ticket_mensajes`
    (id_mensaje, id_ticket, id_usuario, mensaje)
VALUES
(1, 1, 3, 'Hola, no veo mis aportes reflejados.'),
(2, 1, 2, 'Revisaré tus transacciones.'),
(3, 2, 4, 'Quisiera saber la tasa de interés.');
