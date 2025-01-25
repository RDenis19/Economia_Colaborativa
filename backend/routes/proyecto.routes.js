const express = require('express');
const router = express.Router();
const proyectoController = require('../controller/proyecto.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todos los proyectos
router.get('/', authMiddleware, proyectoController.getAll);

// Ruta para obtener un proyecto por su ID
router.get('/:id', authMiddleware, proyectoController.getById);

// Ruta para crear un nuevo proyecto
router.post('/', authMiddleware, proyectoController.create);

// Ruta para actualizar un proyecto existente
router.put('/:id', authMiddleware, proyectoController.update);

// Ruta para eliminar un proyecto
router.delete('/:id', authMiddleware, proyectoController.delete);

module.exports = router;
