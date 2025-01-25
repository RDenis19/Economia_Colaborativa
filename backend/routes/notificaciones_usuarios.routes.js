const express = require('express');
const router = express.Router();
const notificacionesUsuariosController = require('../controller/notificaciones_usuarios.controller');

// Ruta para obtener todas las notificaciones de un usuario
router.get('/:id', notificacionesUsuariosController.getByUserId);

// Ruta para marcar una notificación como leída
router.put('/marcar-leida', notificacionesUsuariosController.markAsRead);

// Ruta para asignar una notificación a un usuario
router.post('/', notificacionesUsuariosController.create);

module.exports = router;