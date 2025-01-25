const express = require('express');
const router = express.Router();
const projectController = require('../controller/proyecto.controller');

// Ruta para obtener todos los proyectos
router.get('/', projectController.getAllProjects);

// Ruta para obtener un proyecto por su ID
router.get('/:id', projectController.getProjectById);

// Ruta para crear un nuevo proyecto
router.post('/', projectController.createProject);

// Ruta para actualizar un proyecto existente
router.put('/:id', projectController.updateProject);

// Ruta para eliminar un proyecto
router.delete('/:id', projectController.deleteProject);

module.exports = router;
