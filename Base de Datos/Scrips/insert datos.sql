-- Insertar roles predeterminados
INSERT INTO roles (nombre, descripcion) VALUES
('Creador', 'Usuarios que crean proyectos'),
('Patrocinador', 'Usuarios que patrocinan proyectos de recompensas'),
('Donante', 'Usuarios que realizan donaciones'),
('Inversor', 'Usuarios que invierten en crowdlending y equity crowdfunding'),
('Administrador', 'Administradores de la plataforma');

-- Insertar usuarios con diferentes roles
INSERT INTO usuarios (nombres, apellido, cedula, email, contraseña, roles_id, verificado, fecha_nacimiento, fotografia, usuarioscol, estado) VALUES
('Pedro', 'Ramírez', '0912345678', 'pedro.ramirez@example.ec', 'hashed_password', 6, 1, '1985-02-20', NULL, NULL, 'Activo'), -- Creador
('María', 'Gómez', '0923456789', 'maria.gomez@example.ec', 'hashed_password', 7, 1, '1990-05-15', NULL, NULL, 'Activo'), -- Patrocinador
('Carlos', 'López', '0934567890', 'carlos.lopez@example.ec', 'hashed_password', 8, 1, '1978-08-10', NULL, NULL, 'Activo'), -- Donante
('Ana', 'Mendoza', '0945678901', 'ana.mendoza@example.ec', 'hashed_password', 9, 0, '1989-12-30', NULL, NULL, 'Activo'), -- Inversor
('Lucía', 'Vásquez', '0956789012', 'lucia.vasquez@example.ec', 'hashed_password', 10, 1, '1980-03-25', NULL, NULL, 'Activo'); -- Administrador

-- Insertar categorías predeterminadas
INSERT INTO categorias (nombre, descripcion) VALUES
('Tecnología', 'Proyectos relacionados con avances tecnológicos'),
('Arte', 'Proyectos artísticos y creativos'),
('Educación', 'Proyectos educativos y de formación'),
('Salud', 'Proyectos relacionados con la salud y el bienestar'),
('Medio Ambiente', 'Proyectos enfocados en la sostenibilidad y el medio ambiente');

-- Insertar tipos de crowdfunding
INSERT INTO tipos_crowdfunding (nombre, descripcion) VALUES
('Recompensas', 'Financiación a cambio de recompensas no monetarias'),
('Donaciones', 'Aportaciones para causas benéficas sin recompensa'),
('Crowdlending', 'Préstamos colectivos con retorno de capital e intereses'),
('Equity', 'Inversiones a cambio de participación accionaria');

-- Insertar proyectos con datos de ejemplo
INSERT INTO proyectos (titulo, descripcion, meta_financiera, fecha_inicio, fecha_fin, usuario_id, categoria_id, tipo_crowdfunding_id) VALUES
('Desarrollo de Gadget X', 'Un gadget innovador que revolucionará el mercado.', 50000.00, '2025-02-01 00:00:00', '2025-04-01 00:00:00', 3, 2, 5),
('Exposición de Arte Contemporáneo', 'Una exposición que mostrará obras de artistas emergentes.', 20000.00, '2025-03-01 00:00:00', '2025-05-01 00:00:00', 4, 3, 6),
('Programa de Alfabetización', 'Un proyecto para enseñar a leer y escribir a adultos en comunidades rurales.', 15000.00, '2025-04-01 00:00:00', '2025-06-01 00:00:00', 5, 4, 7),
('Clínica Móvil de Salud', 'Una clínica móvil para proporcionar atención médica en áreas rurales.', 30000.00, '2025-05-01 00:00:00', '2025-07-01 00:00:00', 6, 5, 8),
('Reforestación de la Amazonía', 'Un proyecto para plantar árboles y preservar la selva amazónica.', 40000.00, '2025-06-01 00:00:00', '2025-08-01 00:00:00', 7, 6, 8);

