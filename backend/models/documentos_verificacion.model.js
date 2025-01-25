const pool = require('../config/db');

const DocumentosVerificacion = {};

// Obtener documentos por ID de verificación
DocumentosVerificacion.getByVerificationId = async (idVerificacion) => {
    const [rows] = await pool.query('SELECT * FROM documentos_verificacion WHERE id_verificacion = ?', [idVerificacion]);
    return rows;
};

// Crear un nuevo documento de verificación
DocumentosVerificacion.create = async (data) => {
    const { id_verificacion, tipo_documento, ruta_archivo } = data;
    const [result] = await pool.query(
        'INSERT INTO documentos_verificacion (id_verificacion, tipo_documento, ruta_archivo) VALUES (?, ?, ?)',
        [id_verificacion, tipo_documento, ruta_archivo]
    );
    return result.insertId;
};

// Eliminar un documento de verificación por su ID
DocumentosVerificacion.delete = async (idDocumento) => {
    const [result] = await pool.query('DELETE FROM documentos_verificacion WHERE id_documento = ?', [idDocumento]);
    return result.affectedRows > 0;
};

module.exports = DocumentosVerificacion;