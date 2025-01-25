const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();


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