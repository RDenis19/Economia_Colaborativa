-- Insertar roles en la tabla Rol
INSERT INTO `cofinance`.`Rol` (`nombreRol`)
VALUES
('Admin'),
('Soporte'),
('Usuario');

-- Insertar usuarios en la tabla Usuario
INSERT INTO `cofinance`.`Usuario` 
(`cedula`, `nombres`, `apellidos`, `fechaNaciemiento`, `edad`, `correoElectronico`, `contraseña`, `estadoVerificacion`, `estado`)
VALUES
('1000000001', 'Admin', 'Principal', '1980-01-01', 44, 'admin@cofinance.com', 'admin123', 'Verificado', 'Activo'), -- Administrador
('1000000002', 'Soporte1', 'Tech', '1990-03-15', 34, 'soporte1@cofinance.com', 'soporte123', 'Verificado', 'Activo'), -- Soporte 1
('1000000003', 'Soporte2', 'Tech', '1991-06-20', 33, 'soporte2@cofinance.com', 'soporte123', 'Verificado', 'Activo'), -- Soporte 2
('1000000004', 'Prestamista1', 'Inversor', '1985-05-10', 39, 'prestamista1@cofinance.com', 'prestamista123', 'Verificado', 'Activo'), -- Prestamista 1
('1000000005', 'Prestamista2', 'Inversor', '1987-07-25', 37, 'prestamista2@cofinance.com', 'prestamista123', 'Verificado', 'Activo'), -- Prestamista 2
('1000000006', 'Prestatario1', 'Cliente', '1995-10-30', 29, 'prestatario1@cofinance.com', 'prestatario123', 'Pendiente', 'Activo'), -- Prestatario 1
('1000000007', 'Prestatario2', 'Cliente', '1994-12-18', 30, 'prestatario2@cofinance.com', 'prestatario123', 'Pendiente', 'Activo'); -- Prestatario 2

INSERT INTO `cofinance`.`Usuario` 
(`cedula`, `nombres`, `apellidos`, `fechaNaciemiento`, `edad`, `correoElectronico`, `contraseña`, `estadoVerificacion`, `estado`)
VALUES
('1000000008', 'Juan', 'Pérez', '1990-02-15', 34, 'juan.perez@cofinance.com', 'password123', 'Verificado', 'Activo'), -- Prestamista 1
('1000000009', 'María', 'Gómez', '1985-08-10', 39, 'maria.gomez@cofinance.com', 'password123', 'Verificado', 'Activo'), -- Prestamista 2
('1000000010', 'Carlos', 'Rodríguez', '1992-11-20', 32, 'carlos.rodriguez@cofinance.com', 'password123', 'Verificado', 'Activo'), -- Prestamista 3
('1000000011', 'Ana', 'López', '1993-05-30', 31, 'ana.lopez@cofinance.com', 'password123', 'Verificado', 'Activo'), -- Prestamista 4
('1000000012', 'Luis', 'Martínez', '1991-07-25', 33, 'luis.martinez@cofinance.com', 'password123', 'Verificado', 'Activo'), -- Prestamista 5
('1000000013', 'Elena', 'Ramírez', '1988-03-05', 36, 'elena.ramirez@cofinance.com', 'password123', 'Pendiente', 'Activo'), -- Prestatario 1
('1000000014', 'José', 'Fernández', '1990-12-15', 34, 'jose.fernandez@cofinance.com', 'password123', 'Pendiente', 'Activo'), -- Prestatario 2
('1000000015', 'Carmen', 'Sánchez', '1987-10-20', 37, 'carmen.sanchez@cofinance.com', 'password123', 'Pendiente', 'Activo'), -- Prestatario 3
('1000000016', 'Miguel', 'Torres', '1994-06-18', 30, 'miguel.torres@cofinance.com', 'password123', 'Pendiente', 'Activo'), -- Prestatario 4
('1000000017', 'Lucía', 'Hernández', '1995-01-25', 29, 'lucia.hernandez@cofinance.com', 'password123', 'Pendiente', 'Activo'); -- Prestatario 5


-- Relacionar roles con usuarios en la tabla Rol_has_Usuario
INSERT INTO `cofinance`.`Rol_has_Usuario` (`Rol_idRol`, `Usuario_cedula`)
VALUES
(1, '1000000001'), -- Admin -> Admin
(2, '1000000002'), -- Soporte1 -> Soporte
(2, '1000000003'), -- Soporte2 -> Soporte
(3, '1000000004'), -- Prestamista1 -> Usuario
(3, '1000000005'), -- Prestamista2 -> Usuario
(3, '1000000006'), -- Prestatario1 -> Usuario
(3, '1000000007'); -- Prestatario2 -> Usuario

INSERT INTO `cofinance`.`Rol_has_Usuario` (`Rol_idRol`, `Usuario_cedula`)
VALUES
(3, '1000000008'), -- Prestamista 1 -> Usuario
(3, '1000000009'), -- Prestamista 2 -> Usuario
(3, '1000000010'), -- Prestamista 3 -> Usuario
(3, '1000000011'), -- Prestamista 4 -> Usuario
(3, '1000000012'), -- Prestamista 5 -> Usuario
(3, '1000000013'), -- Prestatario 1 -> Usuario
(3, '1000000014'), -- Prestatario 2 -> Usuario
(3, '1000000015'), -- Prestatario 3 -> Usuario
(3, '1000000016'), -- Prestatario 4 -> Usuario
(3, '1000000017'); -- Prestatario 5 -> Usuario


-- Informacion de contacto para cada usuario
INSERT INTO `cofinance`.`Informacion_Contacto` (`Usuario_cedula`, `idRegistro_Personal`, `telefono`, `provincia`, `cuidad`, `callePrincipal`, `calleSecundaria`, `codigoPostal`, `nroCasa`)
VALUES
('1000000001', 1, '3000000001', 'San José', 'Escazú', 'Avenida Central', 'Calle 4', '10201', '25'),
('1000000002', 2, '3000000002', 'Alajuela', 'Alajuela Centro', 'Calle Real', 'Calle 2', '20101', '15'),
('1000000003', 3, '3000000003', 'Heredia', 'Heredia Centro', 'Avenida 3', 'Calle 5', '40102', '13'),
('1000000004', 4, '3000000004', 'Cartago', 'Cartago Centro', 'Calle 10', 'Calle 3', '50101', '7'),
('1000000005', 5, '3000000005', 'Limón', 'Limón Centro', 'Avenida 1', 'Calle 8', '60101', '12'),
('1000000006', 6, '3000000006', 'Guanacaste', 'Liberia', 'Avenida 7', 'Calle 4', '70101', '5'),
('1000000007', 7, '3000000007', 'Puntarenas', 'Puntarenas Centro', 'Avenida 9', 'Calle 12', '70102', '8');
INSERT INTO `cofinance`.`Informacion_Contacto` 
(`Usuario_cedula`, `idRegistro_Personal`, `telefono`, `provincia`, `cuidad`, `callePrincipal`, `calleSecundaria`, `codigoPostal`, `nroCasa`)
VALUES
('1000000008', 8, '3000000008', 'San José', 'Escazú', 'Avenida 5', 'Calle 3', '10102', '14'),
('1000000009', 9, '3000000009', 'Alajuela', 'San Carlos', 'Calle Central', 'Calle 1', '20102', '22'),
('1000000010', 10, '3000000010', 'Heredia', 'Belén', 'Avenida Principal', 'Calle 4', '30101', '18'),
('1000000011', 11, '3000000011', 'Cartago', 'Turrialba', 'Calle 10', 'Calle 2', '40102', '16'),
('1000000012', 12, '3000000012', 'Guanacaste', 'Santa Cruz', 'Avenida 7', 'Calle 6', '50101', '9'),
('1000000013', 13, '3000000013', 'Limón', 'Guápiles', 'Calle Central', 'Calle 8', '60102', '11'),
('1000000014', 14, '3000000014', 'Puntarenas', 'Jacó', 'Avenida 3', 'Calle 7', '70101', '7'),
('1000000015', 15, '3000000015', 'San José', 'Moravia', 'Avenida 8', 'Calle 4', '10103', '6'),
('1000000016', 16, '3000000016', 'Alajuela', 'Grecia', 'Calle 2', 'Calle 9', '20103', '19'),
('1000000017', 17, '3000000017', 'Heredia', 'San Rafael', 'Calle Principal', 'Calle 3', '30103', '20');


-- Insertar administradores
INSERT INTO `cofinance`.`Administrador` (`Usuario_cedula`, `nivelAcceso`, `areaSupervision`)
VALUES
('1000000001', 'Superadmin', 'Gestión General');


-- Insertar soporte
INSERT INTO `cofinance`.`Soporte` (`Usuario_cedula`, `nivelAcceso`, `especialidad`, `turno`, `departamento`, `casosAtendidos`)
VALUES
('1000000002', 'Gestor', 'Atención al Cliente', 'Mañana', 'Soporte Técnico', 45),
('1000000003', 'Gestor', 'Gestión de Incidencias', 'Tarde', 'Atención al Usuario', 32);


-- Insertar prestatarios
INSERT INTO `cofinance`.`Prestatario` (`Usuario_cedula`, `tipoOrganizacion`, `descripcionPerfil`, `experienciaProyecto`)
VALUES
('1000000004', 'Persona Individual', 'Prestatario interesado en proyectos comunitarios', '{"proyecto1": "Años de experiencia en proyectos educativos", "proyecto2": "Desarrollo de iniciativas en la comunidad local"}'),
('1000000005', 'Empresa', 'Compañía enfocada en proyectos medioambientales y sostenibles', '{"proyecto1": "Iniciativa de reforestación", "proyecto2": "Proyectos para el manejo de residuos"}');
INSERT INTO `cofinance`.`Prestatario` (`Usuario_cedula`, `tipoOrganizacion`, `descripcionPerfil`, `experienciaProyecto`)
VALUES
('1000000013', 'Persona Individual', 'Prestatario con experiencia en comercio local', '{"proyecto1": "Estrategias de negocio", "proyecto2": "Logística"}'),
('1000000014', 'Empresa', 'Negocio centrado en tecnologías sostenibles', '{"proyecto1": "Producción ecológica"}'),
('1000000015', 'Organización Comunitaria', 'Enfocada en proyectos sociales', '{"proyecto1": "Educación en comunidades"}'),
('1000000016', 'Persona Individual', 'Emprendedor agrícola', '{"proyecto1": "Innovación agrícola"}'),
('1000000017', 'Empresa', 'Empresa dedicada a energía renovable', '{"proyecto1": "Parques eólicos"}');


-- Insertar prestamistas
INSERT INTO `cofinance`.`Prestamista` (`Usuario_cedula`, `nivelEstudio`, `ocupacion`, `ingresosMensuales`, `preferenciaInversion`, `metodoPagoPreferido`)
VALUES
('1000000006', 'Licenciatura', 'Ingeniero en Sistemas', 120000.00, 'Inversión', 'Billetera Digital'),
('1000000007', 'Maestría', 'Abogado', 80000.00, 'Recompensa', 'Transferencia Bancaria');
INSERT INTO `cofinance`.`Prestamista` 
(`Usuario_cedula`, `nivelEstudio`, `ocupacion`, `ingresosMensuales`, `preferenciaInversion`, `metodoPagoPreferido`)
VALUES
('1000000008', 'Bachillerato', 'Profesor', 2000.00, 'Prestamo', 'Transferencia Bancaria'),
('1000000009', 'Licenciatura', 'Contadora', 2500.00, 'Inversión', 'Tarjeta de Crédito'),
('1000000010', 'Maestría', 'Ingeniero', 3500.00, 'Donación', 'Billetera Digital'),
('1000000011', 'Doctorado', 'Investigadora', 4000.00, 'Recompensa', 'Billetera Digital'),
('1000000012', 'Bachillerato', 'Médico', 3000.00, 'Prestamo', 'Transferencia Bancaria');


-- Insertar tipos de crowdfunding
INSERT INTO `cofinance`.`TiposCrowfunding` (`nombre`, `descripcion`)
VALUES
('Donación', 'Los fondos recaudados se destinan a causas benéficas o proyectos sin retorno económico.'),
('Recompensa', 'El financiador recibe una recompensa no monetaria, como un producto o servicio, a cambio de su aportación.'),
('Inversión por Acciones', 'Los inversores reciben acciones de una empresa a cambio de su inversión en el proyecto.'),
('Préstamo', 'Los prestamistas proporcionan dinero a un proyecto o individuo, esperando el retorno de la inversión con interés.');

-- Insertar categorías
INSERT INTO `cofinance`.`Categoria` (`nombre`, `descripcion`)
VALUES
('Arte', 'Proyectos relacionados con la creación de obras artísticas de diversas disciplinas.'),
('Artesanía', 'Proyectos de producción artesanal, desde textiles hasta objetos decorativos.'),
('Comida', 'Proyectos relacionados con la industria alimentaria, desde productos hasta gastronomía.'),
('Cómic', 'Proyectos de creación y publicación de cómics, novelas gráficas y contenido relacionado.'),
('Tecnología', 'Proyectos innovadores en tecnología, software, hardware y startups tecnológicas.'),
('Medio Ambiente', 'Proyectos de protección del medio ambiente, sustentabilidad y energías renovables.'),
('Educación', 'Proyectos que buscan mejorar la educación y acceso al conocimiento en diversas áreas.'),
('Cultura', 'Proyectos que promueven la cultura, el patrimonio y las tradiciones.'),
('Salud', 'Proyectos relacionados con la mejora de la salud y el bienestar humano.'),
('Deporte', 'Proyectos enfocados en el desarrollo de actividades deportivas, clubes o equipos.'),
('Música', 'Proyectos dedicados a la creación musical, conciertos, y producciones sonoras.'),
('Cine', 'Proyectos de producción y distribución de cine, cortometrajes y documentales.'),
('Innovación Social', 'Proyectos que buscan resolver problemas sociales con soluciones innovadoras.'),
('Energía', 'Proyectos relacionados con la creación de soluciones energéticas renovables y eficientes.'),
('Turismo', 'Proyectos de promoción y desarrollo de destinos turísticos, eventos y actividades.'),
('Moda', 'Proyectos relacionados con la creación y diseño de prendas y accesorios.'),
('Vivienda', 'Proyectos dedicados a la construcción y desarrollo de viviendas accesibles.'),
('Transporte', 'Proyectos dedicados a la mejora y desarrollo de sistemas de transporte.'),
('Finanzas', 'Proyectos que buscan innovar en el sector financiero y servicios relacionados.'),
('Agricultura', 'Proyectos enfocados en la agricultura sostenible y la producción de alimentos.');

-- Insertar nuevas categorías de proyectos
INSERT INTO `cofinance`.`Categoria` (`nombre`, `descripcion`)
VALUES
('Microempresas', 'Proyectos dedicados al fomento y crecimiento de pequeñas y microempresas.'),
('Startups', 'Proyectos relacionados con nuevas empresas innovadoras en sus primeras fases de desarrollo.'),
('Financiamiento Corporativo', 'Proyectos orientados a la obtención de fondos para empresas consolidadas.'),
('Bienes Raíces', 'Proyectos en el sector inmobiliario, incluyendo construcción y desarrollo de propiedades comerciales.'),
('Tecnología Financiera (FinTech)', 'Proyectos que desarrollan soluciones tecnológicas en el ámbito de servicios financieros.'),
('Agronegocios', 'Proyectos que vinculan la agricultura con negocios sostenibles de alto potencial de crecimiento.'),
('Infraestructura', 'Proyectos que buscan financiar obras de infraestructura de gran escala como carreteras y puentes.'),
('Proyectos de Expansión Comercial', 'Proyectos de empresas que buscan expandir sus operaciones en nuevos mercados.'),
('Energía y Sostenibilidad Corporativa', 'Proyectos empresariales orientados a la implementación de energías renovables.'),
('Desarrollo Urbano', 'Proyectos orientados al desarrollo y urbanización de áreas comerciales y residenciales.'),
('Cadenas de Suministro', 'Proyectos que buscan optimizar las cadenas de suministro en sectores clave.'); 

-- Insertar subcategorías
INSERT INTO `cofinance`.`SubCategoria` (`nombre`, `descripcion`)
VALUES
('Pintura', 'Proyectos de creación de obras pictóricas y pintura tradicional.'),
('Escultura', 'Proyectos enfocados en la creación de esculturas de diferentes materiales.'),
('Cerámica', 'Proyectos de creación de piezas de cerámica y productos artesanales.'),
('Panadería', 'Proyectos relacionados con la producción de panadería artesanal.'),
('Street Food', 'Proyectos que impulsan el concepto de comida rápida, gourmet o artesanal.'),
('Manga', 'Proyectos de creación y publicación de manga japonés y estilo similar.'),
('Desarrollo de Software', 'Proyectos enfocados en la creación de aplicaciones y plataformas digitales.'),
('Energía Solar', 'Proyectos de instalación y desarrollo de energía solar renovable.'),
('Reciclaje', 'Proyectos que promueven la reutilización de materiales y reducción de residuos.'),
('Energías Alternativas', 'Proyectos que exploran alternativas a las fuentes tradicionales de energía.'),
('Deportes Acuáticos', 'Proyectos relacionados con deportes como el surf, vela, entre otros.'),
('Cine Independiente', 'Proyectos de cine que buscan financiación fuera de los grandes estudios.'),
('Moda Sostenible', 'Proyectos que promueven la moda ética, sostenible y ecológica.'),
('Bienestar Animal', 'Proyectos enfocados en la protección y bienestar de los animales.'),
('Turismo Ecológico', 'Proyectos turísticos centrados en el respeto al medio ambiente y la naturaleza.'),
('Diseño Gráfico', 'Proyectos de diseño visual, branding y creación de identidades gráficas.'),
('Arquitectura', 'Proyectos relacionados con la creación y diseño de edificios y espacios.'),
('Tecnologías Emergentes', 'Proyectos que trabajan con IA, blockchain, IoT y otras tecnologías emergentes.'),
('Desarrollo Rural', 'Proyectos enfocados en mejorar la vida en comunidades rurales.'),
('Innovación en Educación', 'Proyectos que buscan mejorar la educación a través de nuevas metodologías.');

-- Insertar subcategorías correspondientes
INSERT INTO `cofinance`.`SubCategoria` (`nombre`, `descripcion`)
VALUES
('Comercio Local', 'Microempresas orientadas al comercio y servicios locales.'),
('Servicios de Alimentación', 'Proyectos relacionados con la producción y venta de alimentos.'),
('Talleres Artesanales', 'Proyectos artesanales enfocados en la creación y venta de productos hechos a mano.'),
('Tiendas en Línea', 'Proyectos de microempresas que operan en plataformas de e-commerce.'),
('Tecnología Innovadora', 'Startups que desarrollan nuevas soluciones tecnológicas disruptivas.'),
('Inteligencia Artificial', 'Startups que trabajan en la creación y desarrollo de soluciones basadas en IA.'),
('Blockchain y Criptoactivos', 'Proyectos enfocados en el uso de blockchain y criptomonedas.'),
('Educación en Línea', 'Plataformas o soluciones innovadoras para el aprendizaje a distancia.'),
('Préstamos para Expansión', 'Financiamiento para empresas consolidadas que buscan expandirse.'),
('Bonos Corporativos', 'Instrumentos financieros de deuda emitidos por empresas.'),
('Capital de Riesgo', 'Inversiones realizadas en startups con alto riesgo y alto retorno.'),
('Reestructuración Financiera', 'Asesoramiento y financiamiento para empresas que atraviesan dificultades financieras.'),
('Proyectos Residenciales', 'Desarrollo de proyectos de viviendas, desde casas hasta apartamentos.'),
('Inversiones Comerciales', 'Proyectos orientados a la creación y desarrollo de bienes raíces comerciales.'),
('Desarrollo Urbano', 'Proyectos enfocados en la construcción de nuevas zonas urbanas y comerciales.'),
('Construcción de Infraestructura', 'Proyectos de infraestructura pública y privada.'),
('Plataformas de Pago', 'Tecnologías desarrolladas para el procesamiento de pagos en línea y electrónicos.'),
('Préstamos en Línea', 'Soluciones tecnológicas para la obtención de préstamos personales a través de internet.'),
('Servicios Bancarios Digitales', 'Proyectos que modernizan los servicios bancarios tradicionales a través de la tecnología.'),
('Criptomonedas y Blockchain', 'Proyectos que se centran en el uso de blockchain y criptomonedas como medio de inversión.'),
('Cultivo Sostenible', 'Agronegocios enfocados en prácticas agrícolas respetuosas con el medio ambiente.'),
('Ganadería y Agricultura', 'Proyectos que combinan la ganadería y la agricultura en un modelo sostenible.'),
('Agricultura de Precisión', 'Uso de tecnología avanzada para mejorar el rendimiento agrícola.'),
('Energía Renovable en el Agro', 'Proyectos que implementan fuentes de energía renovables en el sector agrícola.'),
('Energía Solar', 'Proyectos orientados al uso de energía solar en diversas aplicaciones.'),
('Eficiencia Energética', 'Proyectos enfocados en la mejora de la eficiencia en el uso de la energía.'),
('Proyectos Ecológicos Corporativos', 'Iniciativas empresariales orientadas a la sostenibilidad ambiental.'),
('Energía Eólica', 'Proyectos que buscan generar energía a través de la energía eólica.'),
('Zonas Comerciales', 'Proyectos urbanos que buscan desarrollar y dinamizar áreas comerciales.'),
('Vivienda Sostenible', 'Proyectos de construcción orientados a la edificación de viviendas ecológicas.'),
('Renovación de Espacios Públicos', 'Proyectos que buscan mejorar y renovar los espacios urbanos públicos.'),
('Ciudades Inteligentes', 'Desarrollo de áreas urbanas con infraestructura tecnológica avanzada para mejorar la calidad de vida.'),
('Logística y Distribución', 'Proyectos que mejoran las operaciones logísticas de distribución de productos.'),
('Suministro de Energía', 'Proyectos enfocados en asegurar un suministro eficiente de energía.'),
('Infraestructura de Transporte', 'Proyectos que desarrollan o mejoran las infraestructuras de transporte.'),
('Optimización de Inventarios', 'Proyectos que buscan mejorar la gestión de inventarios a través de la tecnología.');


-- Insertar proyectos en la tabla Proyectos
INSERT INTO `cofinance`.`Proyectos` 
(`nombreProyecto`, `descripcionProyecto`, `provinciaProyecto`, `cuidadProyecto`, 
`impactoSocial`, `montoSolicitado`, `inicioPlazoProyecto`, `finPlazoProyecto`, 
`videoPresentacionProyecto`, `frecuenciaActualizaciones`, `estado`, 
`Categoria_idCategoria`, `TiposCrowfunding_idTiposCrowfunding`, `SubCategoria_idSubCategoria`)
VALUES
('Energía Solar para Comunidades Rurales', 
 'Implementación de paneles solares en comunidades rurales para acceso a energía limpia.',
 'Pichincha', 'Quito', 
 'Reducción de la pobreza energética en áreas rurales.', 
 50000.00, '2025-02-01', '2025-12-31', 
 NULL, 'Trimestre', 'Pendiente', 
 12, 1, 12), -- Energía y Sostenibilidad Corporativa / Donación / Energía Solar
('Mercado Agroecológico Local', 
 'Creación de un mercado para productores agroecológicos con un enfoque en la sostenibilidad.',
 'Guayas', 'Guayaquil', 
 'Apoyo a pequeños agricultores locales y promoción de productos sostenibles.', 
 30000.00, '2025-03-01', '2025-10-01', 
 NULL, 'Mensual', 'Pendiente', 
 8, 3, 8), -- Agronegocios / Inversión / Cultivo Sostenible
('App de Educación Financiera', 
 'Desarrollo de una app móvil para enseñar conceptos de finanzas personales a jóvenes.', 
 'Azuay', 'Cuenca', 
 'Mejora del conocimiento financiero en la población juvenil.', 
 15000.00, '2025-01-15', '2025-06-30', 
 NULL, 'Bimestre', 'Pendiente', 
 2, 4, 2), -- Startups / Recompensa / Educación en Línea
('Vivienda Social Modular', 
 'Diseño y construcción de viviendas modulares accesibles para familias de bajos ingresos.', 
 'Manabí', 'Portoviejo', 
 'Proveer acceso a viviendas económicas y sostenibles para familias necesitadas.', 
 100000.00, '2025-04-01', '2025-12-31', 
 NULL, 'Semestre', 'Pendiente', 
 7, 2, 7), -- Bienes Raíces / Préstamo / Vivienda Sostenible
('Plataforma Blockchain para Logística', 
 'Desarrollo de una plataforma basada en blockchain para mejorar la trazabilidad en la cadena de suministro.', 
 'Pichincha', 'Quito', 
 'Optimización de las cadenas de suministro mediante la tecnología blockchain.', 
 75000.00, '2025-03-15', '2025-11-15', 
 NULL, 'Cuatrimestre', 'Pendiente', 
 10, 4, 10); -- Tecnología Financiera (FinTech) / Recompensa / Blockchain y Criptoactivos
 
 
 -- Asignar proyectos a los prestatarios
INSERT INTO `cofinance`.`Prestatario_has_Proyectos` (`Prestatario_Usuario_cedula`, `Proyectos_idProyectos`)
VALUES
('1000000004', 1), -- Energía Solar para Comunidades Rurales -> Prestatario 1000000004
('1000000005', 2), -- Mercado Agroecológico Local -> Prestatario 1000000005
('1000000013', 3), -- App de Educación Financiera -> Prestatario 1000000013
('1000000016', 4), -- Vivienda Social Modular -> Prestatario 1000000016
('1000000017', 5); -- Plataforma Blockchain para Logística -> Prestatario 1000000017

-- Insertar validaciones para los proyectos
INSERT INTO `cofinance`.`Validacion` 
(`tipoValidacion`, `estadoValidacion`, `documentacionValRuta`, `fechaSolicitud`, `fechaValidacion`, `Proyectos_idProyectos`)
VALUES
-- Validaciones para el proyecto 1
('Identidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 1),
('Financiera', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 1),
('Credibilidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 1),

-- Validaciones para el proyecto 2
('Identidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 2),
('Financiera', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 2),
('Credibilidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 2),

-- Validaciones para el proyecto 3
('Identidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 3),
('Financiera', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 3),
('Credibilidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 3),

-- Validaciones para el proyecto 4
('Identidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 4),
('Financiera', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 4),
('Credibilidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 4),

-- Validaciones para el proyecto 5
('Identidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 5),
('Financiera', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 5),
('Credibilidad', 'Pendiente', NULL, CURRENT_TIMESTAMP, NULL, 5);
