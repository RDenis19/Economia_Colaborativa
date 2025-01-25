const Notificaciones = require('../models/notificaciones.model');

const notificacionesController = {};

// Obtener todas las notificaciones
notificacionesController.getAll = async (req, res) => {
    try {
        const notificaciones = await Notificaciones.getAll();
        res.status(200).json(notificaciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las notificaciones.', error });
    }
};

// Obtener una notificación por su ID
notificacionesController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const notificacion = await Notificaciones.getById(id);

        if (!notificacion) {
            return res.status(404).json({ mensaje: 'Notificación no encontrada.' });
        }

        res.status(200).json(notificacion);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la notificación.', error });
    }
};

// Crear una nueva notificación
notificacionesController.create = async (req, res) => {
    try {
        const { tipo_origen, id_origen, titulo, mensaje, tipo_notificacion } = req.body;

        if (!tipo_origen || !id_origen || !mensaje || !tipo_notificacion) {
            return res.status(400).json({ mensaje: 'Los campos tipo_origen, id_origen, mensaje y tipo_notificacion son obligatorios.' });
        }

        const idNotificacion = await Notificaciones.create({ tipo_origen, id_origen, titulo, mensaje, tipo_notificacion });
        res.status(201).json({ mensaje: 'Notificación creada exitosamente.', id: idNotificacion });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la notificación.', error });
    }
};

// Eliminar una notificación
notificacionesController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await Notificaciones.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Notificación no encontrada o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Notificación eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la notificación.', error });
    }
};

module.exports = notificacionesController;