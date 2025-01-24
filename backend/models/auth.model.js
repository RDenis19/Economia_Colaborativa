const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = {};

// Buscar usuario por correo electrónico
Usuario.findByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE correo = ?', [email]);
    return rows[0];
};

// Verificar contraseña
Usuario.verifyPassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = Usuario;
