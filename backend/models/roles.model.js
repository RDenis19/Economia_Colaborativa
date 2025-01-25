const pool = require('../config/db');

const Roles = {};

// Obtener todos los roles
Roles.getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM roles');
    return rows;
};

// Obtener un rol por su ID
Roles.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM roles WHERE id_rol = ?', [id]);
    return rows[0];
};

// Crear un nuevo rol
Roles.create = async (nombre_rol) => {
    const [result] = await pool.query('INSERT INTO roles (nombre_rol) VALUES (?)', [nombre_rol]);
    return result.insertId;
};

// Actualizar un rol existente
Roles.update = async (id, nombre_rol) => {
    const [result] = await pool.query('UPDATE roles SET nombre_rol = ? WHERE id_rol = ?', [nombre_rol, id]);
    return result.affectedRows > 0;
};

// Eliminar un rol
Roles.delete = async (id) => {
    const [result] = await pool.query('DELETE FROM roles WHERE id_rol = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = Roles;
