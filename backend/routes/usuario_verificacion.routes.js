const express = require('express');
const router = express.Router();
const usuarioVerificacionController = require('../controller/usuario_verificacion.controller');

// Ruta para obtener el estado de verificación de un usuario por su ID
router.get('/:id', usuarioVerificacionController.getByUserId);

// Ruta para crear un nuevo registro de verificación
router.post('/', usuarioVerificacionController.create);

// Ruta para actualizar los estados de verificación
router.put('/:id', usuarioVerificacionController.update);

// Ruta para eliminar un registro de verificación
router.delete('/:id', usuarioVerificacionController.delete);

module.exports = router;