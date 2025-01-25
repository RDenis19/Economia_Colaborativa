const express = require('express');
const router = express.Router();
const usuarioVerificacionController = require('../controller/usuario_verificacion.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener el estado de verificación de un usuario por su ID
router.get('/:id', authMiddleware, usuarioVerificacionController.getByUserId);

// Ruta para crear un nuevo registro de verificación
router.post('/', authMiddleware, usuarioVerificacionController.create);

// Ruta para actualizar los estados de verificación
router.put('/:id', authMiddleware, usuarioVerificacionController.update);

// Ruta para eliminar un registro de verificación
router.delete('/:id', authMiddleware, usuarioVerificacionController.delete);

module.exports = router;
