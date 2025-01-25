const pool = require('../config/db');

const ProyectoContribuciones = {};

// Obtener todas las contribuciones a un proyecto por su ID
ProyectoContribuciones.getByProjectId = async (idProyecto) => {
    const [rows] = await pool.query(
        `SELECT c.*, u.usuario AS nombre_usuario
         FROM proyecto_contribuciones c
         JOIN usuario u ON c.id_usuario = u.idusuario
         WHERE c.id_proyecto = ?`,
        [idProyecto]
    );
    return rows;
};

// Crear una nueva contribución a un proyecto
ProyectoContribuciones.create = async (data) => {
    const { id_usuario, id_proyecto, monto } = data;
    const [result] = await pool.query(
        `INSERT INTO proyecto_contribuciones (id_usuario, id_proyecto, monto)
         VALUES (?, ?, ?)`,
        [id_usuario, id_proyecto, monto]
    );
    return result.insertId;
};

// Eliminar una contribución por su ID
ProyectoContribuciones.delete = async (idContribucion) => {
    const [result] = await pool.query(
        `DELETE FROM proyecto_contribuciones WHERE id_contribucion = ?`,
        [idContribucion]
    );
    return result.affectedRows > 0;
};

module.exports = ProyectoContribuciones;
