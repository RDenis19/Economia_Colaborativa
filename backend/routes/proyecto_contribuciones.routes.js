const express = require('express');
const router = express.Router();
const proyectoContribucionesController = require('../controller/proyecto_contribuciones.controller');

// Ruta para obtener todas las contribuciones a un proyecto
router.get('/:id', proyectoContribucionesController.getByProjectId);

// Ruta para crear una nueva contribución
router.post('/', proyectoContribucionesController.create);

// Ruta para eliminar una contribución
router.delete('/:id', proyectoContribucionesController.delete);

module.exports = router;