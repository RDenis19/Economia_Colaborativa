const express = require('express');
const router = express.Router();
const proyectoController = require('../controller/proyecto.controller');

// Ruta para obtener todos los proyectos
router.get('/', proyectoController.getAll);

// Ruta para obtener un proyecto por su ID
router.get('/:id', proyectoController.getById);

// Ruta para crear un nuevo proyecto
router.post('/', proyectoController.create);

// Ruta para actualizar un proyecto existente
router.put('/:id', proyectoController.update);

// Ruta para eliminar un proyecto
router.delete('/:id', proyectoController.delete);

module.exports = router;