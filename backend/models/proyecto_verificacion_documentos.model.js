const pool = require('../config/db');

const ProyectoVerificacionDocumentos = {};

// Obtener todos los documentos de verificación de proyectos por ID de verificación
ProyectoVerificacionDocumentos.getByVerificationId = async (idVerificacion) => {
    const [rows] = await pool.query(
        `SELECT * FROM proyecto_verificacion_documentos WHERE id_proyecto_verificacion = ?`,
        [idVerificacion]
    );
    return rows;
};

// Crear un nuevo documento de verificación de proyecto
ProyectoVerificacionDocumentos.create = async (data) => {
    const { id_proyecto_verificacion, tipo_documento, ruta_archivo } = data;
    const [result] = await pool.query(
        `INSERT INTO proyecto_verificacion_documentos (id_proyecto_verificacion, tipo_documento, ruta_archivo)
         VALUES (?, ?, ?)`,
        [id_proyecto_verificacion, tipo_documento, ruta_archivo]
    );
    return result.insertId;
};

// Eliminar un documento de verificación de proyecto por su ID
ProyectoVerificacionDocumentos.delete = async (idDocumento) => {
    const [result] = await pool.query(
        `DELETE FROM proyecto_verificacion_documentos WHERE id_documento_proyecto = ?`,
        [idDocumento]
    );
    return result.affectedRows > 0;
};

module.exports = ProyectoVerificacionDocumentos;