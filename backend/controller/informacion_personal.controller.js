const InformacionPersonal = require('../models/informacion_personal.model');

const informacionPersonalController = {};

// Obtener la información personal de un usuario por su ID
informacionPersonalController.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const infoPersonal = await InformacionPersonal.getByUserId(id);

        if (!infoPersonal) {
            return res.status(404).json({ mensaje: 'Información personal no encontrada para este usuario.' });
        }

        res.status(200).json(infoPersonal);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la información personal.', error });
    }
};

// Crear nueva información personal para un usuario
informacionPersonalController.create = async (req, res) => {
    try {
        const nuevaInfo = req.body;

        if (!nuevaInfo.id_usuario || !nuevaInfo.nombres || !nuevaInfo.apellidos || !nuevaInfo.identificacion || !nuevaInfo.genero) {
            return res.status(400).json({ mensaje: 'Por favor, proporciona todos los campos requeridos.' });
        }

        await InformacionPersonal.create(nuevaInfo);
        res.status(201).json({ mensaje: 'Información personal creada exitosamente.', id: nuevaInfo.id_usuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la información personal.', error });
    }
};

// Actualizar la información personal de un usuario
informacionPersonalController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const exito = await InformacionPersonal.update(id, datosActualizados);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Información personal no encontrada o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Información personal actualizada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la información personal.', error });
    }
};

// Eliminar la información personal de un usuario
informacionPersonalController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await InformacionPersonal.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Información personal no encontrada o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Información personal eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la información personal.', error });
    }
};

module.exports = informacionPersonalController;
