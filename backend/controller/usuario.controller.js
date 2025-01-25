const Usuario = require('../models/usuario.model');

const usuarioController = {};

// Obtener todos los usuarios
usuarioController.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.getAllUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los usuarios.', error });
    }
};

// Obtener un usuario por su ID
usuarioController.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.getUserById(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el usuario.', error });
    }
};

// Crear un nuevo usuario
usuarioController.createUser = async (req, res) => {
    try {
        const nuevoUsuario = req.body;

        if (!nuevoUsuario.usuario || !nuevoUsuario.correo || !nuevoUsuario.contraseña) {
            return res.status(400).json({ mensaje: 'Por favor, proporciona todos los campos necesarios.' });
        }

        const idUsuario = await Usuario.createUser(nuevoUsuario);
        res.status(201).json({ mensaje: 'Usuario creado exitosamente.', id: idUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el usuario.', error });
    }
};

// Actualizar un usuario existente
usuarioController.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const exito = await Usuario.updateUser(id, datosActualizados);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Usuario actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el usuario.', error });
    }
};

// Eliminar un usuario
usuarioController.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await Usuario.deleteUser(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario.', error });
    }
};

module.exports = usuarioController;
