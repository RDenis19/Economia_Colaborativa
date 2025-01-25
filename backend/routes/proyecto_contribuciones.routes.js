const express = require('express');
const router = express.Router();
const proyectoContribucionesController = require('../controller/proyecto_contribuciones.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todas las contribuciones a un proyecto
router.get('/:id', authMiddleware, proyectoContribucionesController.getByProjectId);

// Ruta para crear una nueva contribución
router.post('/', authMiddleware, proyectoContribucionesController.create);

// Ruta para eliminar una contribución
router.delete('/:id', authMiddleware, proyectoContribucionesController.delete);

module.exports = router;
