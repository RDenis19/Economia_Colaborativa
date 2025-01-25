const NotificacionesUsuarios = require('../models/notificaciones_usuarios.model');

const notificacionesUsuariosController = {};

// Obtener todas las notificaciones de un usuario
notificacionesUsuariosController.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const notificaciones = await NotificacionesUsuarios.getByUserId(id);

        if (!notificaciones || notificaciones.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron notificaciones para este usuario.' });
        }

        res.status(200).json(notificaciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las notificaciones del usuario.', error });
    }
};

// Marcar una notificación como leída
notificacionesUsuariosController.markAsRead = async (req, res) => {
    try {
        const { idUsuario, idNotificacion } = req.body;

        if (!idUsuario || !idNotificacion) {
            return res.status(400).json({ mensaje: 'Los campos idUsuario y idNotificacion son obligatorios.' });
        }

        const exito = await NotificacionesUsuarios.markAsRead(idUsuario, idNotificacion);

        if (!exito) {
            return res.status(404).json({ mensaje: 'No se pudo marcar la notificación como leída.' });
        }

        res.status(200).json({ mensaje: 'Notificación marcada como leída exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al marcar la notificación como leída.', error });
    }
};

// Crear una notificación para un usuario
notificacionesUsuariosController.create = async (req, res) => {
    try {
        const { id_notificacion, id_usuario } = req.body;

        if (!id_notificacion || !id_usuario) {
            return res.status(400).json({ mensaje: 'Los campos id_notificacion y id_usuario son obligatorios.' });
        }

        const exito = await NotificacionesUsuarios.create({ id_notificacion, id_usuario });

        if (!exito) {
            return res.status(500).json({ mensaje: 'Error al crear la notificación para el usuario.' });
        }

        res.status(201).json({ mensaje: 'Notificación asignada al usuario exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al asignar la notificación al usuario.', error });
    }
};

module.exports = notificacionesUsuariosController;