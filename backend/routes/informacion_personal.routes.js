const express = require('express');
const router = express.Router();
const informacionPersonalController = require('../controller/informacion_personal.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener la información personal de un usuario por su ID
router.get('/:id', authMiddleware, informacionPersonalController.getByUserId);

// Ruta para crear nueva información personal
router.post('/', authMiddleware, informacionPersonalController.create);

// Ruta para actualizar la información personal de un usuario
router.put('/:id', authMiddleware, informacionPersonalController.update);

// Ruta para eliminar la información personal de un usuario
router.delete('/:id', authMiddleware, informacionPersonalController.delete);

module.exports = router;
