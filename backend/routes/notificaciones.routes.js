const express = require('express');
const router = express.Router();
const notificacionesController = require('../controller/notificaciones.controller');

// Ruta para obtener todas las notificaciones
router.get('/', notificacionesController.getAll);

// Ruta para obtener una notificación por su ID
router.get('/:id', notificacionesController.getById);

// Ruta para crear una nueva notificación
router.post('/', notificacionesController.create);

// Ruta para eliminar una notificación
router.delete('/:id', notificacionesController.delete);

module.exports = router;