const express = require('express');
const router = express.Router();
const informacionAcademicaController = require('../controller/informacion_academica.controller');

// Ruta para obtener la información académica de un usuario por su ID
router.get('/:id', informacionAcademicaController.getByUserId);

// Ruta para crear nueva información académica
router.post('/', informacionAcademicaController.create);

// Ruta para actualizar la información académica de un usuario
router.put('/:id', informacionAcademicaController.update);

// Ruta para eliminar la información académica de un usuario
router.delete('/:id', informacionAcademicaController.delete);

module.exports = router;
