const pool = require('../config/db');
const bcrypt = require('bcrypt');

const Usuario = {};

// Obtener todos los usuarios
Usuario.getAllUsers = async () => {
    const [rows] = await pool.query('SELECT idusuario, usuario, correo, fecha_registro FROM usuario');
    return rows;
};

// Obtener un usuario por su ID
Usuario.getUserById = async (id) => {
    const [rows] = await pool.query('SELECT idusuario, usuario, correo, fecha_registro FROM usuario WHERE idusuario = ?', [id]);
    return rows[0];
};

// Crear un nuevo usuario
Usuario.createUser = async (data) => {
    const { usuario, correo, contraseña } = data;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const [result] = await pool.query(
        'INSERT INTO usuario (usuario, correo, contraseña, fecha_registro) VALUES (?, ?, ?, NOW())',
        [usuario, correo, hashedPassword]
    );
    return result.insertId;
};

// Actualizar un usuario existente
Usuario.updateUser = async (id, data) => {
    const { usuario, correo, contraseña } = data;
    let query = 'UPDATE usuario SET ';
    const updates = [];
    const params = [];

    if (usuario) {
        updates.push('usuario = ?');
        params.push(usuario);
    }
    if (correo) {
        updates.push('correo = ?');
        params.push(correo);
    }
    if (contraseña) {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        updates.push('contraseña = ?');
        params.push(hashedPassword);
    }

    query += updates.join(', ') + ' WHERE idusuario = ?';
    params.push(id);

    const [result] = await pool.query(query, params);
    return result.affectedRows > 0;
};

// Eliminar un usuario
Usuario.deleteUser = async (id) => {
    const [result] = await pool.query('DELETE FROM usuario WHERE idusuario = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = Usuario;
