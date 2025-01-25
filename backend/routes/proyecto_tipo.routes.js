const express = require('express');
const router = express.Router();
const proyectoTipoController = require('../controller/proyecto_tipo.controller');

// Ruta para obtener todos los tipos de proyectos
router.get('/', proyectoTipoController.getAll);

// Ruta para obtener un tipo de proyecto por su ID
router.get('/:id', proyectoTipoController.getById);

// Ruta para crear un nuevo tipo de proyecto
router.post('/', proyectoTipoController.create);

// Ruta para actualizar un tipo de proyecto existente
router.put('/:id', proyectoTipoController.update);

// Ruta para eliminar un tipo de proyecto
router.delete('/:id', proyectoTipoController.delete);

module.exports = router;