const express = require('express');
const router = express.Router();
const rolesController = require('../controller/roles.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todos los roles
router.get('/', authMiddleware, rolesController.getAll);

// Ruta para obtener un rol por su ID
router.get('/:id', authMiddleware, rolesController.getById);

// Ruta para crear un nuevo rol
router.post('/', authMiddleware, rolesController.create);

// Ruta para actualizar un rol existente
router.put('/:id', authMiddleware, rolesController.update);

// Ruta para eliminar un rol
router.delete('/:id', authMiddleware, rolesController.delete);

module.exports = router;
