const express = require('express');
const router = express.Router();
const usuarioRolesController = require('../controller/usuario_roles.controller');

// Ruta para obtener los roles asignados a un usuario por su ID
router.get('/:id', usuarioRolesController.getRolesByUserId);

// Ruta para asignar un rol a un usuario
router.post('/', usuarioRolesController.assignRole);

// Ruta para eliminar un rol asignado a un usuario
router.delete('/', usuarioRolesController.removeRole);

module.exports = router;
