const pool = require('../config/db');

const Notificaciones = {};

// Obtener todas las notificaciones
Notificaciones.getAll = async () => {
    const [rows] = await pool.query(`SELECT * FROM notificaciones`);
    return rows;
};

// Obtener una notificación por su ID
Notificaciones.getById = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM notificaciones WHERE id_notificacion = ?`, [id]);
    return rows[0];
};

// Crear una nueva notificación
Notificaciones.create = async (data) => {
    const { tipo_origen, id_origen, titulo, mensaje, tipo_notificacion } = data;
    const [result] = await pool.query(
        `INSERT INTO notificaciones (tipo_origen, id_origen, titulo, mensaje, tipo_notificacion)
         VALUES (?, ?, ?, ?, ?)`,
        [tipo_origen, id_origen, titulo, mensaje, tipo_notificacion]
    );
    return result.insertId;
};

// Eliminar una notificación por su ID
Notificaciones.delete = async (id) => {
    const [result] = await pool.query(`DELETE FROM notificaciones WHERE id_notificacion = ?`, [id]);
    return result.affectedRows > 0;
};

module.exports = Notificaciones;