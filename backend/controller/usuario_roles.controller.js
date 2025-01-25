const UsuarioRoles = require('../models/usuario_roles.model');

const usuarioRolesController = {};

// Obtener los roles asignados a un usuario por su ID
usuarioRolesController.getRolesByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const roles = await UsuarioRoles.getRolesByUserId(id);

        if (!roles || roles.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron roles asignados para este usuario.' });
        }

        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los roles asignados.', error });
    }
};

// Asignar un rol a un usuario
usuarioRolesController.assignRole = async (req, res) => {
    try {
        const { id_usuario, id_rol } = req.body;

        if (!id_usuario || !id_rol) {
            return res.status(400).json({ mensaje: 'Los campos id_usuario y id_rol son obligatorios.' });
        }

        const id = await UsuarioRoles.assignRole(id_usuario, id_rol);
        res.status(201).json({ mensaje: 'Rol asignado exitosamente.', id });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'El usuario ya tiene asignado este rol.' });
        }
        res.status(500).json({ mensaje: 'Error al asignar el rol.', error });
    }
};

// Eliminar un rol asignado a un usuario
usuarioRolesController.removeRole = async (req, res) => {
    try {
        const { id_usuario, id_rol } = req.body;

        if (!id_usuario || !id_rol) {
            return res.status(400).json({ mensaje: 'Los campos id_usuario y id_rol son obligatorios.' });
        }

        const exito = await UsuarioRoles.removeRole(id_usuario, id_rol);

        if (!exito) {
            return res.status(404).json({ mensaje: 'El rol no está asignado al usuario o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Rol eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el rol.', error });
    }
};

module.exports = usuarioRolesController;
