const pool = require('../config/db');

const TicketMensajes = {};

// Obtener todos los mensajes de un ticket por su ID
TicketMensajes.getByTicketId = async (idTicket) => {
    const [rows] = await pool.query(
        `SELECT tm.*, u.usuario AS nombre_usuario
         FROM ticket_mensajes tm
         JOIN usuario u ON tm.id_usuario = u.idusuario
         WHERE tm.id_ticket = ?`,
        [idTicket]
    );
    return rows;
};

// Crear un nuevo mensaje para un ticket
TicketMensajes.create = async (data) => {
    const { id_ticket, id_usuario, mensaje } = data;
    const [result] = await pool.query(
        `INSERT INTO ticket_mensajes (id_ticket, id_usuario, mensaje)
         VALUES (?, ?, ?)`,
        [id_ticket, id_usuario, mensaje]
    );
    return result.insertId;
};

// Eliminar un mensaje por su ID
TicketMensajes.delete = async (idMensaje) => {
    const [result] = await pool.query(
        `DELETE FROM ticket_mensajes WHERE id_mensaje = ?`,
        [idMensaje]
    );
    return result.affectedRows > 0;
};

module.exports = TicketMensajes;
