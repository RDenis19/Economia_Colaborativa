const express = require('express');
const router = express.Router();
const informacionContactoController = require('../controller/informacion_contacto.controller');

// Ruta para obtener la información de contacto de un usuario por su ID
router.get('/:id', informacionContactoController.getByUserId);

// Ruta para crear nueva información de contacto
router.post('/', informacionContactoController.create);

// Ruta para actualizar la información de contacto de un usuario
router.put('/:id', informacionContactoController.update);

// Ruta para eliminar la información de contacto de un usuario
router.delete('/:id', informacionContactoController.delete);

module.exports = router;
