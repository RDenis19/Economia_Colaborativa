const express = require('express');
const router = express.Router();
const informacionFinancieraController = require('../controller/informacion_financiera.controller');

// Ruta para obtener la información financiera de un usuario por su ID
router.get('/:id', informacionFinancieraController.getByUserId);

// Ruta para crear nueva información financiera
router.post('/', informacionFinancieraController.create);

// Ruta para actualizar la información financiera de un usuario
router.put('/:id', informacionFinancieraController.update);

// Ruta para eliminar la información financiera de un usuario
router.delete('/:id', informacionFinancieraController.delete);

module.exports = router;
