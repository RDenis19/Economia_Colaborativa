const pool = require('../config/db');

const Tickets = {};

// Obtener todos los tickets
Tickets.getAll = async () => {
    const [rows] = await pool.query(
        `SELECT t.*, u.usuario AS creador, us.usuario AS soporte
         FROM tickets t
         LEFT JOIN usuario u ON t.id_usuario_creador = u.idusuario
         LEFT JOIN usuario us ON t.id_usuario_soporte = us.idusuario`
    );
    return rows;
};

// Obtener un ticket por su ID
Tickets.getById = async (id) => {
    const [rows] = await pool.query(
        `SELECT t.*, u.usuario AS creador, us.usuario AS soporte
         FROM tickets t
         LEFT JOIN usuario u ON t.id_usuario_creador = u.idusuario
         LEFT JOIN usuario us ON t.id_usuario_soporte = us.idusuario
         WHERE t.id_ticket = ?`,
        [id]
    );
    return rows[0];
};

// Crear un nuevo ticket
Tickets.create = async (data) => {
    const { id_usuario_creador, asunto, descripcion, prioridad } = data;
    const [result] = await pool.query(
        `INSERT INTO tickets (id_usuario_creador, asunto, descripcion, prioridad)
         VALUES (?, ?, ?, ?)`,
        [id_usuario_creador, asunto, descripcion, prioridad]
    );
    return result.insertId;
};

// Actualizar un ticket existente
Tickets.update = async (id, data) => {
    const { id_usuario_soporte, estado, prioridad, fecha_cierre } = data;
    const [result] = await pool.query(
        `UPDATE tickets SET 
         id_usuario_soporte = ?, 
         estado = ?, 
         prioridad = ?, 
         fecha_cierre = ?
         WHERE id_ticket = ?`,
        [id_usuario_soporte, estado, prioridad, fecha_cierre, id]
    );
    return result.affectedRows > 0;
};

// Eliminar un ticket
Tickets.delete = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM tickets WHERE id_ticket = ?`,
        [id]
    );
    return result.affectedRows > 0;
};

module.exports = Tickets;