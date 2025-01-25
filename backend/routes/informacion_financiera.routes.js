const express = require('express');
const router = express.Router();
const informacionFinancieraController = require('../controller/informacion_financiera.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener la información financiera de un usuario por su ID
router.get('/:id', authMiddleware, informacionFinancieraController.getByUserId);

// Ruta para crear nueva información financiera
router.post('/', authMiddleware, informacionFinancieraController.create);

// Ruta para actualizar la información financiera de un usuario
router.put('/:id', authMiddleware, informacionFinancieraController.update);

// Ruta para eliminar la información financiera de un usuario
router.delete('/:id', authMiddleware, informacionFinancieraController.delete);

module.exports = router;
