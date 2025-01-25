const express = require('express');
const router = express.Router();
const proyectoVerificacionController = require('../controller/proyecto_verificacion.controller');

// Ruta para obtener todas las verificaciones de proyectos
router.get('/', proyectoVerificacionController.getAll);

// Ruta para obtener una verificación de proyecto por su ID
router.get('/:id', proyectoVerificacionController.getById);

// Ruta para crear una nueva verificación de proyecto
router.post('/', proyectoVerificacionController.create);

// Ruta para actualizar una verificación de proyecto
router.put('/:id', proyectoVerificacionController.update);

// Ruta para eliminar una verificación de proyecto
router.delete('/:id', proyectoVerificacionController.delete);

module.exports = router;