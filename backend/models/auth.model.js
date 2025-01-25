const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Verificar contraseña (login)
Usuario.verifyPassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = Usuario;