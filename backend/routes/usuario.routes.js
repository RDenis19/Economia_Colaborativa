const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', usuarioController.getUserById);

// Ruta para crear un nuevo usuario
router.post('/', usuarioController.createUser);

// Ruta para actualizar un usuario existente
router.put('/:id', usuarioController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', usuarioController.deleteUser);

module.exports = router;
