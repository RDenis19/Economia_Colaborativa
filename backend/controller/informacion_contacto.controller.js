const InformacionContacto = require('../models/informacion_contacto.model');

const informacionContactoController = {};

// Obtener la información de contacto de un usuario por su ID
informacionContactoController.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const infoContacto = await InformacionContacto.getByUserId(id);

        if (!infoContacto) {
            return res.status(404).json({ mensaje: 'Información de contacto no encontrada para este usuario.' });
        }

        res.status(200).json(infoContacto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la información de contacto.', error });
    }
};

// Crear nueva información de contacto para un usuario
informacionContactoController.create = async (req, res) => {
    try {
        const nuevaInfo = req.body;

        if (!nuevaInfo.id_usuario || !nuevaInfo.provincia || !nuevaInfo.canton || !nuevaInfo.celularPrincipal) {
            return res.status(400).json({ mensaje: 'Por favor, proporciona todos los campos requeridos.' });
        }

        await InformacionContacto.create(nuevaInfo);
        res.status(201).json({ mensaje: 'Información de contacto creada exitosamente.', id: nuevaInfo.id_usuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la información de contacto.', error });
    }
};

// Actualizar la información de contacto de un usuario
informacionContactoController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const exito = await InformacionContacto.update(id, datosActualizados);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Información de contacto no encontrada o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Información de contacto actualizada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la información de contacto.', error });
    }
};

// Eliminar la información de contacto de un usuario
informacionContactoController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await InformacionContacto.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Información de contacto no encontrada o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Información de contacto eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la información de contacto.', error });
    }
};

module.exports = informacionContactoController;
