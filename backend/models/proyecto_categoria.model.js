const pool = require('../config/db');

// Asegúrate de declarar el objeto antes de usarlo
const ProyectoCategoria = {}; 

// Obtener todas las categorías de proyectos
ProyectoCategoria.getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM proyecto_categoria');
    return rows;
};

// Obtener una categoría de proyecto por su ID
ProyectoCategoria.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM proyecto_categoria WHERE id_categoria = ?', [id]);
    return rows[0];
};

// Crear una nueva categoría de proyecto
ProyectoCategoria.create = async (nombre_categoria) => {
    const [result] = await pool.query('INSERT INTO proyecto_categoria (nombre_categoria) VALUES (?)', [nombre_categoria]);
    return result.insertId;
};

// Actualizar una categoría de proyecto existente
ProyectoCategoria.update = async (id, nombre_categoria) => {
    const [result] = await pool.query('UPDATE proyecto_categoria SET nombre_categoria = ? WHERE id_categoria = ?', [nombre_categoria, id]);
    return result.affectedRows > 0;
};

// Eliminar una categoría de proyecto
ProyectoCategoria.delete = async (id) => {
    const [result] = await pool.query('DELETE FROM proyecto_categoria WHERE id_categoria = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = ProyectoCategoria;
