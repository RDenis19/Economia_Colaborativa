const pool = require('../config/db');

const InformacionFinanciera = {};

// Obtener la información financiera de un usuario por su ID
InformacionFinanciera.getByUserId = async (idUsuario) => {
    const [rows] = await pool.query('SELECT * FROM usuario_informacion_financiera WHERE id_usuario = ?', [idUsuario]);
    return rows[0];
};

// Crear nueva información financiera para un usuario
InformacionFinanciera.create = async (data) => {
    const { id_usuario, ingreso_mensual, gasto_mensual_promedio, gasto_endeudamiento, patrimonio } = data;
    const [result] = await pool.query(
        'INSERT INTO usuario_informacion_financiera (id_usuario, ingreso_mensual, gasto_mensual_promedio, gasto_endeudamiento, patrimonio) VALUES (?, ?, ?, ?, ?)',
        [id_usuario, ingreso_mensual || 0.00, gasto_mensual_promedio || 0.00, gasto_endeudamiento || 0.00, patrimonio || 0.00]
    );
    return result.insertId;
};

// Actualizar la información financiera de un usuario
InformacionFinanciera.update = async (idUsuario, data) => {
    const { ingreso_mensual, gasto_mensual_promedio, gasto_endeudamiento, patrimonio } = data;
    const [result] = await pool.query(
        'UPDATE usuario_informacion_financiera SET ingreso_mensual = ?, gasto_mensual_promedio = ?, gasto_endeudamiento = ?, patrimonio = ?, ultima_actualizacion = CURRENT_TIMESTAMP WHERE id_usuario = ?',
        [ingreso_mensual, gasto_mensual_promedio, gasto_endeudamiento, patrimonio, idUsuario]
    );
    return result.affectedRows > 0;
};

// Eliminar la información financiera de un usuario
InformacionFinanciera.delete = async (idUsuario) => {
    const [result] = await pool.query('DELETE FROM usuario_informacion_financiera WHERE id_usuario = ?', [idUsuario]);
    return result.affectedRows > 0;
};

module.exports = InformacionFinanciera;
