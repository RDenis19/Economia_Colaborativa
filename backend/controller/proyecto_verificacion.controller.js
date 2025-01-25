const ProyectoVerificacion = require('../models/proyecto_verificacion.model');

const proyectoVerificacionController = {};

// Obtener todas las verificaciones de proyectos
proyectoVerificacionController.getAll = async (req, res) => {
    try {
        const verificaciones = await ProyectoVerificacion.getAll();
        res.status(200).json(verificaciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las verificaciones de proyectos.', error });
    }
};

// Obtener una verificación de proyecto por su ID
proyectoVerificacionController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const verificacion = await ProyectoVerificacion.getById(id);

        if (!verificacion) {
            return res.status(404).json({ mensaje: 'Verificación de proyecto no encontrada.' });
        }

        res.status(200).json(verificacion);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la verificación de proyecto.', error });
    }
};

// Crear una nueva verificación para un proyecto
proyectoVerificacionController.create = async (req, res) => {
    try {
        const { id_proyecto } = req.body;

        if (!id_proyecto) {
            return res.status(400).json({ mensaje: 'El campo id_proyecto es obligatorio.' });
        }

        const idVerificacion = await ProyectoVerificacion.create(id_proyecto);
        res.status(201).json({ mensaje: 'Verificación de proyecto creada exitosamente.', id: idVerificacion });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la verificación de proyecto.', error });
    }
};

// Actualizar el estado de una verificación de proyecto
proyectoVerificacionController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado_general, fecha_verificacion } = req.body;

        const exito = await ProyectoVerificacion.update(id, { estado_general, fecha_verificacion });

        if (!exito) {
            return res.status(404).json({ mensaje: 'Verificación de proyecto no encontrada o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Verificación de proyecto actualizada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la verificación de proyecto.', error });
    }
};

// Eliminar una verificación de proyecto
proyectoVerificacionController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await ProyectoVerificacion.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Verificación de proyecto no encontrada o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Verificación de proyecto eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la verificación de proyecto.', error });
    }
};

module.exports = proyectoVerificacionController;