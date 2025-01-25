const Roles = require('../models/roles.model');

const rolesController = {};

// Obtener todos los roles
rolesController.getAll = async (req, res) => {
    try {
        const roles = await Roles.getAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los roles.', error });
    }
};

// Obtener un rol por su ID
rolesController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Roles.getById(id);

        if (!rol) {
            return res.status(404).json({ mensaje: 'Rol no encontrado.' });
        }

        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el rol.', error });
    }
};

// Crear un nuevo rol
rolesController.create = async (req, res) => {
    try {
        const { nombre_rol } = req.body;

        if (!nombre_rol) {
            return res.status(400).json({ mensaje: 'El campo nombre_rol es obligatorio.' });
        }

        const id = await Roles.create(nombre_rol);
        res.status(201).json({ mensaje: 'Rol creado exitosamente.', id });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el rol.', error });
    }
};

// Actualizar un rol existente
rolesController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_rol } = req.body;

        if (!nombre_rol) {
            return res.status(400).json({ mensaje: 'El campo nombre_rol es obligatorio.' });
        }

        const exito = await Roles.update(id, nombre_rol);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Rol no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Rol actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el rol.', error });
    }
};

// Eliminar un rol
rolesController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await Roles.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Rol no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Rol eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el rol.', error });
    }
};

module.exports = rolesController;