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

        console.log("Recibiendo datos para actualizar:", id, data); // 👀 LOG IMPORTANTE

        if (!id || Object.keys(data).length === 0) {
            return res.status(400).json({ mensaje: "Faltan datos para actualizar el usuario" });
        }

        const actualizado = await UsuarioCompleto.updateUserDetails(id, data);

        if (!actualizado) {
            return res.status(404).json({ mensaje: 'Error al actualizar usuario' });
        }

        res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error("Error en el backend al actualizar usuario:", error);
        res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
    }
};


module.exports = usuarioCompletoController;
