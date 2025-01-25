const pool = require('../config/db');

const UsuarioRoles = {};

// Obtener los roles asignados a un usuario por su ID
UsuarioRoles.getRolesByUserId = async (idUsuario) => {
    const [rows] = await pool.query(
        'SELECT ur.id_usuario_roles, ur.id_rol, r.nombre_rol FROM usuario_roles ur INNER JOIN roles r ON ur.id_rol = r.id_rol WHERE ur.id_usuario = ?',
        [idUsuario]
    );
    return rows;
};

// Asignar un rol a un usuario
UsuarioRoles.assignRole = async (idUsuario, idRol) => {
    const [result] = await pool.query(
        'INSERT INTO usuario_roles (id_usuario, id_rol) VALUES (?, ?)',
        [idUsuario, idRol]
    );
    return result.insertId;
};

// Eliminar un rol asignado a un usuario
UsuarioRoles.removeRole = async (idUsuario, idRol) => {
    const [result] = await pool.query(
        'DELETE FROM usuario_roles WHERE id_usuario = ? AND id_rol = ?',
        [idUsuario, idRol]
    );
    return result.affectedRows > 0;
};

module.exports = UsuarioRoles;
