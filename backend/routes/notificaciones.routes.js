const express = require('express');
const router = express.Router();
const notificacionesController = require('../controller/notificaciones.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todas las notificaciones
router.get('/', authMiddleware, notificacionesController.getAll);

// Ruta para obtener una notificación por su ID
router.get('/:id', authMiddleware, notificacionesController.getById);

// Ruta para crear una nueva notificación
router.post('/', authMiddleware, notificacionesController.create);

// Ruta para eliminar una notificación
router.delete('/:id', authMiddleware, notificacionesController.delete);

module.exports = router;
