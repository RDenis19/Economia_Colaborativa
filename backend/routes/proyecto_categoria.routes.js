const express = require('express');
const router = express.Router();
const proyectoCategoriaController = require('../controller/proyecto_categoria.controller');

// Ruta para obtener todas las categorías de proyectos
router.get('/', proyectoCategoriaController.getAll);

// Ruta para obtener una categoría de proyecto por su ID
router.get('/:id', proyectoCategoriaController.getById);

// Ruta para crear una nueva categoría de proyecto
router.post('/', proyectoCategoriaController.create);

// Ruta para actualizar una categoría de proyecto existente
router.put('/:id', proyectoCategoriaController.update);

// Ruta para eliminar una categoría de proyecto
router.delete('/:id', proyectoCategoriaController.delete);

module.exports = router;
