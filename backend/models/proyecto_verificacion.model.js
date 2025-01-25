const pool = require('../config/db');

const ProyectoVerificacion = {};

// Obtener todas las verificaciones de proyectos
ProyectoVerificacion.getAll = async () => {
    const [rows] = await pool.query(
        `SELECT v.*, p.nombre AS nombre_proyecto
         FROM proyecto_verificacion v
         JOIN proyecto p ON v.id_proyecto = p.id_proyecto`
    );
    return rows;
};

// Obtener una verificación de proyecto por su ID
ProyectoVerificacion.getById = async (id) => {
    const [rows] = await pool.query(
        `SELECT v.*, p.nombre AS nombre_proyecto
         FROM proyecto_verificacion v
         JOIN proyecto p ON v.id_proyecto = p.id_proyecto
         WHERE v.id_proyecto_verificacion = ?`,
        [id]
    );
    return rows[0];
};

// Crear una nueva verificación para un proyecto
ProyectoVerificacion.create = async (id_proyecto) => {
    const [result] = await pool.query(
        `INSERT INTO proyecto_verificacion (id_proyecto) VALUES (?)`,
        [id_proyecto]
    );
    return result.insertId;
};

// Actualizar el estado de una verificación de proyecto
ProyectoVerificacion.update = async (id, data) => {
    const { estado_general, fecha_verificacion } = data;

    const [result] = await pool.query(
        `UPDATE proyecto_verificacion SET 
         estado_general = ?, 
         fecha_verificacion = ?
         WHERE id_proyecto_verificacion = ?`,
        [estado_general, fecha_verificacion, id]
    );
    return result.affectedRows > 0;
};

// Eliminar una verificación de proyecto
ProyectoVerificacion.delete = async (id) => {
    const [result] = await pool.query('DELETE FROM proyecto_verificacion WHERE id_proyecto_verificacion = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = ProyectoVerificacion;