const pool = require('../config/db');

const InformacionContacto = {};

// Obtener la información de contacto de un usuario por su ID
InformacionContacto.getByUserId = async (idUsuario) => {
    const [rows] = await pool.query('SELECT * FROM usuario_informacion_contacto WHERE id_usuario = ?', [idUsuario]);
    return rows[0];
};

// Crear nueva información de contacto para un usuario
InformacionContacto.create = async (data) => {
    const { id_usuario, provincia, canton, parroquia, callePrincipal, calleSecundaria, nroCasa, celularPrincipal } = data;
    const [result] = await pool.query(
        'INSERT INTO usuario_informacion_contacto (id_usuario, provincia, canton, parroquia, callePrincipal, calleSecundaria, nroCasa, celularPrincipal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id_usuario, provincia, canton, parroquia, callePrincipal, calleSecundaria, nroCasa, celularPrincipal]
    );
    return result.insertId;
};

// Actualizar la información de contacto de un usuario
InformacionContacto.update = async (idUsuario, data) => {
    const { provincia, canton, parroquia, callePrincipal, calleSecundaria, nroCasa, celularPrincipal } = data;
    const [result] = await pool.query(
        'UPDATE usuario_informacion_contacto SET provincia = ?, canton = ?, parroquia = ?, callePrincipal = ?, calleSecundaria = ?, nroCasa = ?, celularPrincipal = ? WHERE id_usuario = ?',
        [provincia, canton, parroquia, callePrincipal, calleSecundaria, nroCasa, celularPrincipal, idUsuario]
    );
    return result.affectedRows > 0;
};

// Eliminar la información de contacto de un usuario
InformacionContacto.delete = async (idUsuario) => {
    const [result] = await pool.query('DELETE FROM usuario_informacion_contacto WHERE id_usuario = ?', [idUsuario]);
    return result.affectedRows > 0;
};

module.exports = InformacionContacto;
