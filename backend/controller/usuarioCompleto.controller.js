const UsuarioCompleto = require('../models/usuarioCompleto.model');

const usuarioCompletoController = {};

// Obtener todos los datos de un usuario
usuarioCompletoController.getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioCompleto.getUserDetails(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener detalles del usuario', error });
    }
};

// Actualizar la información del usuario
usuarioCompletoController.updateUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const actualizado = await UsuarioCompleto.updateUserDetails(id, data);

        if (!actualizado) {
            return res.status(404).json({ mensaje: 'Error al actualizar usuario' });
        }

        res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
    }
};

module.exports = usuarioCompletoController;
