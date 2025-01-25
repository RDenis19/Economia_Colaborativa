const express = require('express');
const router = express.Router();
const notificacionesUsuariosController = require('../controller/notificaciones_usuarios.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todas las notificaciones de un usuario
router.get('/:id', authMiddleware, notificacionesUsuariosController.getByUserId);

// Ruta para marcar una notificación como leída
router.put('/marcar-leida', authMiddleware, notificacionesUsuariosController.markAsRead);

// Ruta para asignar una notificación a un usuario
router.post('/', authMiddleware, notificacionesUsuariosController.create);

module.exports = router;
