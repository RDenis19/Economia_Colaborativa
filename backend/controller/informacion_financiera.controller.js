const InformacionFinanciera = require('../models/informacion_financiera.model');

const informacionFinancieraController = {};

// Obtener la información financiera de un usuario por su ID
informacionFinancieraController.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const infoFinanciera = await InformacionFinanciera.getByUserId(id);

        if (!infoFinanciera) {
            return res.status(404).json({ mensaje: 'Información financiera no encontrada para este usuario.' });
        }

        res.status(200).json(infoFinanciera);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la información financiera.', error });
    }
};

// Crear nueva información financiera para un usuario
informacionFinancieraController.create = async (req, res) => {
    try {
        const nuevaInfo = req.body;

        if (!nuevaInfo.id_usuario) {
            return res.status(400).json({ mensaje: 'El campo id_usuario es obligatorio.' });
        }

        await InformacionFinanciera.create(nuevaInfo);
        res.status(201).json({ mensaje: 'Información financiera creada exitosamente.', id: nuevaInfo.id_usuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la información financiera.', error });
    }
};

// Actualizar la información financiera de un usuario
informacionFinancieraController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const exito = await InformacionFinanciera.update(id, datosActualizados);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Información financiera no encontrada o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Información financiera actualizada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la información financiera.', error });
    }
};

// Eliminar la información financiera de un usuario
informacionFinancieraController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await InformacionFinanciera.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Información financiera no encontrada o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Información financiera eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la información financiera.', error });
    }
};

module.exports = informacionFinancieraController;
