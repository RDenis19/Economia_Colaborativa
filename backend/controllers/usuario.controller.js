const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombres, apellido, cedula, email, contraseña, rol_id, fecha_nacimiento, usuarioscol, estado } = req.body;

        if (!nombres || !apellido || !cedula || !email || !contraseña || !rol_id) {
            return res.status(400).json({ mensaje: 'Por favor, completa todos los campos obligatorios.' });
        }

        const existingUser = await pool.execute(
            `SELECT * FROM usuarios WHERE email = ? OR cedula = ?`,
            [email, cedula]
        );

        if (existingUser[0].length > 0) {
            return res.status(400).json({ mensaje: 'El email o cédula ya están registrados.' });
        }

        const nuevoUsuarioId = await Usuario.create({
            nombres,
            apellido,
            cedula,
            email,
            contraseña,
            rol_id,
            fecha_nacimiento,
            usuarioscol,
            estado
        });

        const nuevoUsuario = await Usuario.findById(nuevoUsuarioId);

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente.', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        if (!email || !contraseña) {
            return res.status(400).json({ mensaje: 'Por favor, ingresa tu email y contraseña.' });
        }

        const usuario = await Usuario.findByEmail(email);
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
        }

        const esValido = await Usuario.verifyPassword(contraseña, usuario.contraseña);
        if (!esValido) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { id: usuario.id, rol_id: usuario.rol_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso.', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioData = req.body;

        const usuarioExistente = await Usuario.findById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        const filasAfectadas = await Usuario.update(id, usuarioData);

        if (filasAfectadas === 0) {
            return res.status(400).json({ mensaje: 'No se actualizó ningún campo.' });
        }

        const usuarioActualizado = await Usuario.findById(id);

        res.status(200).json({ mensaje: 'Usuario actualizado exitosamente.', usuario: usuarioActualizado });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioExistente = await Usuario.findById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        const filasAfectadas = await Usuario.delete(id);

        if (filasAfectadas === 0) {
            return res.status(400).json({ mensaje: 'No se pudo eliminar el usuario.' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};
