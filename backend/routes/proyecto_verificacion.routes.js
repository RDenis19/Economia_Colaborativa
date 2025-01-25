const express = require('express');
const router = express.Router();
const proyectoVerificacionController = require('../controller/proyecto_verificacion.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todas las verificaciones de proyectos
router.get('/', authMiddleware, proyectoVerificacionController.getAll);

// Ruta para obtener una verificación de proyecto por su ID
router.get('/:id', authMiddleware, proyectoVerificacionController.getById);

// Ruta para crear una nueva verificación de proyecto
router.post('/', authMiddleware, proyectoVerificacionController.create);

// Ruta para actualizar una verificación de proyecto
router.put('/:id', authMiddleware, proyectoVerificacionController.update);

// Ruta para eliminar una verificación de proyecto
router.delete('/:id', authMiddleware, proyectoVerificacionController.delete);

module.exports = router;
