const express = require('express');
const router = express.Router();
const informacionPersonalController = require('../controller/informacion_personal.controller');

// Ruta para obtener la información personal de un usuario por su ID
router.get('/:id', informacionPersonalController.getByUserId);

// Ruta para crear nueva información personal
router.post('/', informacionPersonalController.create);

// Ruta para actualizar la información personal de un usuario
router.put('/:id', informacionPersonalController.update);

// Ruta para eliminar la información personal de un usuario
router.delete('/:id', informacionPersonalController.delete);

module.exports = router;
