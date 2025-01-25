const express = require('express');
const router = express.Router();
const proyectoTipoController = require('../controller/proyecto_tipo.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todos los tipos de proyectos
router.get('/', authMiddleware, proyectoTipoController.getAll);

// Ruta para obtener un tipo de proyecto por su ID
router.get('/:id', authMiddleware, proyectoTipoController.getById);

// Ruta para crear un nuevo tipo de proyecto
router.post('/', authMiddleware, proyectoTipoController.create);

// Ruta para actualizar un tipo de proyecto existente
router.put('/:id', authMiddleware, proyectoTipoController.update);

// Ruta para eliminar un tipo de proyecto
router.delete('/:id', authMiddleware, proyectoTipoController.delete);

module.exports = router;
