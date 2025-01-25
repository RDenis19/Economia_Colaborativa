const pool = require('../config/db');

const Usuario = {};

// Buscar usuario por correo y obtener su rol
Usuario.findByEmail = async (email) => {
    const [rows] = await pool.query(`
        SELECT u.*, ur.id_rol AS rol_id
        FROM usuario u
        LEFT JOIN usuario_roles ur ON u.idusuario = ur.id_usuario
        WHERE u.correo = ?
    `, [email]);
    return rows[0];
};

// Verificar contraseña
Usuario.verifyPassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = Usuario;
