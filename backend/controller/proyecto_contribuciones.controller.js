const ProyectoContribuciones = require('../models/proyecto_contribuciones.model');

const proyectoContribucionesController = {};

// Obtener todas las contribuciones a un proyecto
proyectoContribucionesController.getByProjectId = async (req, res) => {
    try {
        const { id } = req.params;
        const contribuciones = await ProyectoContribuciones.getByProjectId(id);

        if (!contribuciones || contribuciones.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron contribuciones para este proyecto.' });
        }

        res.status(200).json(contribuciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las contribuciones del proyecto.', error });
    }
};

// Crear una nueva contribución
proyectoContribucionesController.create = async (req, res) => {
    try {
        const { id_usuario, id_proyecto, monto } = req.body;

        if (!id_usuario || !id_proyecto || !monto) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios (id_usuario, id_proyecto, monto).' });
        }

        const idContribucion = await ProyectoContribuciones.create({ id_usuario, id_proyecto, monto });
        res.status(201).json({ mensaje: 'Contribución creada exitosamente.', id: idContribucion });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la contribución.', error });
    }
};

// Eliminar una contribución
proyectoContribucionesController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await ProyectoContribuciones.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Contribución no encontrada o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Contribución eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la contribución.', error });
    }
};

module.exports = proyectoContribucionesController;