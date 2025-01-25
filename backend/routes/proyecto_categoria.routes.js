const express = require('express');
const router = express.Router();
const proyectoCategoriaController = require('../controller/proyecto_categoria.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todas las categorías de proyectos
router.get('/', authMiddleware, proyectoCategoriaController.getAll);

// Ruta para obtener una categoría de proyecto por su ID
router.get('/:id', authMiddleware, proyectoCategoriaController.getById);

// Ruta para crear una nueva categoría de proyecto
router.post('/', authMiddleware, proyectoCategoriaController.create);

// Ruta para actualizar una categoría de proyecto existente
router.put('/:id', authMiddleware, proyectoCategoriaController.update);

// Ruta para eliminar una categoría de proyecto
router.delete('/:id', authMiddleware, proyectoCategoriaController.delete);

module.exports = router;
