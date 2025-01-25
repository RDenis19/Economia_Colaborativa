const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/usuario.routes.js');
const personalInfoRoutes = require('./routes/informacion_personal.routes.js');
const contactInfoRoutes = require('./routes/informacion_contacto.routes.js');
const financialInfoRoutes = require('./routes/informacion_financiera.routes.js');
const academicInfoRoutes = require('./routes/informacion_academica.routes.js');
const rolesRoutes = require('./routes/roles.routes.js');
const userRolesRoutes = require('./routes/usuario_roles.routes.js');
const userVerificationRoutes = require('./routes/usuario_verificacion.routes.js');
const documentosVerificacionRoutes = require('./routes/documentos_verificacion.routes.js');
const proyectoTipoRoutes = require('./routes/proyecto_tipo.routes.js');
const proyectoCategoriaRoutes = require('./routes/proyecto_categoria.routes.js');
const proyectoRoutes = require('./routes/proyecto.routes.js');
const proyectoVerificacionRoutes = require('./routes/proyecto_verificacion.routes.js');
const proyectoVerificacionDocumentosRoutes = require('./routes/proyecto_verificacion_documentos.routes.js');
const proyectoContribucionesRoutes = require('./routes/proyecto_contribuciones.routes.js');
const ticketsRoutes = require('./routes/tickets.routes.js');
const ticketMensajesRoutes = require('./routes/ticket_mensajes.routes.js');
const notificacionesRoutes = require('./routes/notificaciones.routes.js');
const notificacionesUsuariosRoutes = require('./routes/notificaciones_usuarios.routes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/informacion-personal', personalInfoRoutes);
app.use('/informacion-contacto', contactInfoRoutes);
app.use('/informacion-financiera', financialInfoRoutes);
app.use('/informacion-academica', academicInfoRoutes);
app.use('/roles', rolesRoutes);
app.use('/usuario-roles', userRolesRoutes);
app.use('/usuario-verificacion', userVerificationRoutes);
app.use('/documentos-verificacion', documentosVerificacionRoutes);
app.use('/proyecto-tipo', proyectoTipoRoutes);
app.use('/proyecto-categoria', proyectoCategoriaRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/proyecto-verificacion', proyectoVerificacionRoutes);
app.use('/proyecto-verificacion-documentos', proyectoVerificacionDocumentosRoutes);
app.use('/proyecto-contribuciones', proyectoContribucionesRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/ticket-mensajes', ticketMensajesRoutes);
app.use('/notificaciones', notificacionesRoutes);
app.use('/notificaciones-usuarios', notificacionesUsuariosRoutes);

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});