const express = require('express');
const router = express.Router();
const rolesController = require('../controller/roles.controller');

// Ruta para obtener todos los roles
router.get('/', rolesController.getAll);

// Ruta para obtener un rol por su ID
router.get('/:id', rolesController.getById);

// Ruta para crear un nuevo rol
router.post('/', rolesController.create);

// Ruta para actualizar un rol existente
router.put('/:id', rolesController.update);

// Ruta para eliminar un rol
router.delete('/:id', rolesController.delete);

module.exports = router;
