const pool = require('../config/db');

const InformacionAcademica = {};

// Obtener la información académica de un usuario por su ID
InformacionAcademica.getByUserId = async (idUsuario) => {
    const [rows] = await pool.query('SELECT * FROM usuario_informacion_academica WHERE id_usuario = ?', [idUsuario]);
    return rows[0];
};

// Crear nueva información académica para un usuario
InformacionAcademica.create = async (data) => {
    const { id_usuario, ocupacion, nivel_estudios, titulo_universitario } = data;
    const [result] = await pool.query(
        'INSERT INTO usuario_informacion_academica (id_usuario, ocupacion, nivel_estudios, titulo_universitario) VALUES (?, ?, ?, ?)',
        [id_usuario, ocupacion || null, nivel_estudios || null, titulo_universitario || null]
    );
    return result.insertId;
};

// Actualizar la información académica de un usuario
InformacionAcademica.update = async (idUsuario, data) => {
    const { ocupacion, nivel_estudios, titulo_universitario } = data;
    const [result] = await pool.query(
        'UPDATE usuario_informacion_academica SET ocupacion = ?, nivel_estudios = ?, titulo_universitario = ? WHERE id_usuario = ?',
        [ocupacion, nivel_estudios, titulo_universitario, idUsuario]
    );
    return result.affectedRows > 0;
};

// Eliminar la información académica de un usuario
InformacionAcademica.delete = async (idUsuario) => {
    const [result] = await pool.query('DELETE FROM usuario_informacion_academica WHERE id_usuario = ?', [idUsuario]);
    return result.affectedRows > 0;
};

module.exports = InformacionAcademica;
