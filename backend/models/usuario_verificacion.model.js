const pool = require('../config/db');

const UsuarioVerificacion = {};

// Obtener el estado de verificación de un usuario
UsuarioVerificacion.getByUserId = async (idUsuario) => {
    const [rows] = await pool.query('SELECT * FROM usuario_verificacion WHERE id_usuario = ?', [idUsuario]);
    return rows[0];
};

// Crear un nuevo registro de verificación para un usuario
UsuarioVerificacion.create = async (idUsuario) => {
    const [result] = await pool.query(
        'INSERT INTO usuario_verificacion (id_usuario) VALUES (?)',
        [idUsuario]
    );
    return result.insertId;
};

// Actualizar los estados de verificación de un usuario
UsuarioVerificacion.update = async (idVerificacion, data) => {
    const {
        estado_identidad,
        estado_domicilio,
        estado_ingresos,
        estado_antecedentes,
        fecha_verificacion_identidad,
        fecha_verificacion_domicilio,
        fecha_verificacion_ingresos,
        fecha_verificacion_antecedentes
    } = data;

    const [result] = await pool.query(
        `UPDATE usuario_verificacion SET 
         estado_identidad = ?, 
         estado_domicilio = ?, 
         estado_ingresos = ?, 
         estado_antecedentes = ?, 
         fecha_verificacion_identidad = ?, 
         fecha_verificacion_domicilio = ?, 
         fecha_verificacion_ingresos = ?, 
         fecha_verificacion_antecedentes = ? 
         WHERE id_verificacion = ?`,
        [
            estado_identidad,
            estado_domicilio,
            estado_ingresos,
            estado_antecedentes,
            fecha_verificacion_identidad,
            fecha_verificacion_domicilio,
            fecha_verificacion_ingresos,
            fecha_verificacion_antecedentes,
            idVerificacion
        ]
    );
    return result.affectedRows > 0;
};

// Eliminar el registro de verificación de un usuario
UsuarioVerificacion.delete = async (idVerificacion) => {
    const [result] = await pool.query('DELETE FROM usuario_verificacion WHERE id_verificacion = ?', [idVerificacion]);
    return result.affectedRows > 0;
};

module.exports = UsuarioVerificacion;