const InformacionAcademica = require('../models/informacion_academica.model');

const informacionAcademicaController = {};

// Obtener la información académica de un usuario por su ID
informacionAcademicaController.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const infoAcademica = await InformacionAcademica.getByUserId(id);

        if (!infoAcademica) {
            return res.status(404).json({ mensaje: 'Información académica no encontrada para este usuario.' });
        }

        res.status(200).json(infoAcademica);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la información académica.', error });
    }
};

// Crear nueva información académica para un usuario
informacionAcademicaController.create = async (req, res) => {
    try {
        const nuevaInfo = req.body;

        if (!nuevaInfo.id_usuario) {
            return res.status(400).json({ mensaje: 'El campo id_usuario es obligatorio.' });
        }

        await InformacionAcademica.create(nuevaInfo);
        res.status(201).json({ mensaje: 'Información académica creada exitosamente.', id: nuevaInfo.id_usuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la información académica.', error });
    }
};

// Actualizar la información académica de un usuario
informacionAcademicaController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const exito = await InformacionAcademica.update(id, datosActualizados);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Información académica no encontrada o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Información académica actualizada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la información académica.', error });
    }
};

// Eliminar la información académica de un usuario
informacionAcademicaController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await InformacionAcademica.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Información académica no encontrada o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Información académica eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la información académica.', error });
    }
};

module.exports = informacionAcademicaController;
