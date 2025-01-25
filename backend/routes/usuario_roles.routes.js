const express = require('express');
const router = express.Router();
const usuarioRolesController = require('../controller/usuario_roles.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener los roles asignados a un usuario por su ID
router.get('/:id', authMiddleware, usuarioRolesController.getRolesByUserId);

// Ruta para asignar un rol a un usuario
router.post('/', authMiddleware, usuarioRolesController.assignRole);

// Ruta para eliminar un rol asignado a un usuario
router.delete('/', authMiddleware, usuarioRolesController.removeRole);

module.exports = router;
