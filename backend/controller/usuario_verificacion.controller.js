const UsuarioVerificacion = require('../models/usuario_verificacion.model');

const usuarioVerificacionController = {};

// Obtener el estado de verificación de un usuario
usuarioVerificacionController.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const verificacion = await UsuarioVerificacion.getByUserId(id);

        if (!verificacion) {
            return res.status(404).json({ mensaje: 'No se encontró información de verificación para este usuario.' });
        }

        res.status(200).json(verificacion);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la información de verificación.', error });
    }
};

// Crear un nuevo registro de verificación para un usuario
usuarioVerificacionController.create = async (req, res) => {
    try {
        const { id_usuario } = req.body;

        if (!id_usuario) {
            return res.status(400).json({ mensaje: 'El campo id_usuario es obligatorio.' });
        }

        const idVerificacion = await UsuarioVerificacion.create(id_usuario);
        res.status(201).json({ mensaje: 'Registro de verificación creado exitosamente.', id: idVerificacion });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el registro de verificación.', error });
    }
};

// Actualizar los estados de verificación de un usuario
usuarioVerificacionController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const exito = await UsuarioVerificacion.update(id, datosActualizados);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Registro de verificación no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Registro de verificación actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el registro de verificación.', error });
    }
};

// Eliminar el registro de verificación de un usuario
usuarioVerificacionController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await UsuarioVerificacion.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Registro de verificación no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Registro de verificación eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el registro de verificación.', error });
    }
};

module.exports = usuarioVerificacionController;