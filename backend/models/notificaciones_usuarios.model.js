const pool = require('../config/db');

const NotificacionesUsuarios = {};

// Obtener todas las notificaciones de un usuario
NotificacionesUsuarios.getByUserId = async (idUsuario) => {
    const [rows] = await pool.query(
        `SELECT nu.*, n.titulo, n.mensaje, n.tipo_origen, n.tipo_notificacion, n.fecha_creacion
         FROM notificaciones_usuarios nu
         JOIN notificaciones n ON nu.id_notificacion = n.id_notificacion
         WHERE nu.id_usuario = ?`,
        [idUsuario]
    );
    return rows;
};

// Marcar una notificación como leída
NotificacionesUsuarios.markAsRead = async (idUsuario, idNotificacion) => {
    const [result] = await pool.query(
        `UPDATE notificaciones_usuarios 
         SET leido = 1, fecha_lectura = NOW() 
         WHERE id_usuario = ? AND id_notificacion = ?`,
        [idUsuario, idNotificacion]
    );
    return result.affectedRows > 0;
};

// Crear una nueva notificación para un usuario
NotificacionesUsuarios.create = async (data) => {
    const { id_notificacion, id_usuario } = data;
    const [result] = await pool.query(
        `INSERT INTO notificaciones_usuarios (id_notificacion, id_usuario)
         VALUES (?, ?)`,
        [id_notificacion, id_usuario]
    );
    return result.affectedRows > 0;
};

module.exports = NotificacionesUsuarios;