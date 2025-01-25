const pool = require('../config/db');

const InformacionPersonal = {};

// Obtener la información personal de un usuario por su ID
InformacionPersonal.getByUserId = async (idUsuario) => {
    const [rows] = await pool.query('SELECT * FROM usuario_informacion_personal WHERE id_usuario = ?', [idUsuario]);
    return rows[0];
};

// Crear nueva información personal para un usuario
InformacionPersonal.create = async (data) => {
    const { id_usuario, nombres, apellidos, fecha_nacimiento, identificacion, genero } = data;
    const [result] = await pool.query(
        'INSERT INTO usuario_informacion_personal (id_usuario, nombres, apellidos, fecha_nacimiento, identificacion, genero) VALUES (?, ?, ?, ?, ?, ?)',
        [id_usuario, nombres, apellidos, fecha_nacimiento, identificacion, genero]
    );
    return result.insertId;
};

// Actualizar la información personal de un usuario
InformacionPersonal.update = async (idUsuario, data) => {
    const { nombres, apellidos, fecha_nacimiento, identificacion, genero } = data;
    const [result] = await pool.query(
        'UPDATE usuario_informacion_personal SET nombres = ?, apellidos = ?, fecha_nacimiento = ?, identificacion = ?, genero = ? WHERE id_usuario = ?',
        [nombres, apellidos, fecha_nacimiento, identificacion, genero, idUsuario]
    );
    return result.affectedRows > 0;
};

// Eliminar la información personal de un usuario
InformacionPersonal.delete = async (idUsuario) => {
    const [result] = await pool.query('DELETE FROM usuario_informacion_personal WHERE id_usuario = ?', [idUsuario]);
    return result.affectedRows > 0;
};

module.exports = InformacionPersonal;
