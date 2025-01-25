const pool = require('../config/db');

const Proyecto = {};

// Obtener todos los proyectos
Proyecto.getAll = async () => {
    const [rows] = await pool.query(
        `SELECT p.*, t.nombre_tipo, c.nombre_categoria, u.usuario AS creador
         FROM proyecto p
         JOIN proyecto_tipo t ON p.id_tipo = t.id_tipo
         JOIN proyecto_categoria c ON p.id_categoria = c.id_categoria
         JOIN usuario u ON p.id_creador = u.idusuario`
    );
    return rows;
};

// Obtener un proyecto por su ID
Proyecto.getById = async (id) => {
    const [rows] = await pool.query(
        `SELECT p.*, t.nombre_tipo, c.nombre_categoria, u.usuario AS creador
         FROM proyecto p
         JOIN proyecto_tipo t ON p.id_tipo = t.id_tipo
         JOIN proyecto_categoria c ON p.id_categoria = c.id_categoria
         JOIN usuario u ON p.id_creador = u.idusuario
         WHERE p.id_proyecto = ?`,
        [id]
    );
    return rows[0];
};

// Crear un nuevo proyecto
Proyecto.create = async (data) => {
    const {
        nombre,
        descripcion,
        meta_financiera,
        fecha_inicio,
        id_creador,
        id_tipo,
        id_categoria
    } = data;

    const [result] = await pool.query(
        `INSERT INTO proyecto (nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, id_categoria)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, id_categoria]
    );
    return result.insertId;
};

// Actualizar un proyecto existente
Proyecto.update = async (id, data) => {
    const {
        nombre,
        descripcion,
        meta_financiera,
        fecha_inicio,
        id_tipo,
        id_categoria,
        estado
    } = data;

    const [result] = await pool.query(
        `UPDATE proyecto SET 
         nombre = ?, 
         descripcion = ?, 
         meta_financiera = ?, 
         fecha_inicio = ?, 
         id_tipo = ?, 
         id_categoria = ?, 
         estado = ?
         WHERE id_proyecto = ?`,
        [nombre, descripcion, meta_financiera, fecha_inicio, id_tipo, id_categoria, estado, id]
    );
    return result.affectedRows > 0;
};

// Eliminar un proyecto
Proyecto.delete = async (id) => {
    const [result] = await pool.query('DELETE FROM proyecto WHERE id_proyecto = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = Proyecto;