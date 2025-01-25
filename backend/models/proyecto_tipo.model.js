const pool = require('../config/db');

const ProyectoTipo = {};

// Obtener todos los tipos de proyectos
ProyectoTipo.getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM proyecto_tipo');
    return rows;
};

// Obtener un tipo de proyecto por su ID
ProyectoTipo.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM proyecto_tipo WHERE id_tipo = ?', [id]);
    return rows[0];
};

// Crear un nuevo tipo de proyecto
ProyectoTipo.create = async (nombre_tipo) => {
    const [result] = await pool.query('INSERT INTO proyecto_tipo (nombre_tipo) VALUES (?)', [nombre_tipo]);
    return result.insertId;
};

// Actualizar un tipo de proyecto existente
ProyectoTipo.update = async (id, nombre_tipo) => {
    const [result] = await pool.query('UPDATE proyecto_tipo SET nombre_tipo = ? WHERE id_tipo = ?', [nombre_tipo, id]);
    return result.affectedRows > 0;
};

// Eliminar un tipo de proyecto
ProyectoTipo.delete = async (id) => {
    const [result] = await pool.query('DELETE FROM proyecto_tipo WHERE id_tipo = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = ProyectoTipo;