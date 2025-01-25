const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta pública: Crear un nuevo usuario (registro)
router.post('/', usuarioController.createUser);

// Ruta para obtener todos los usuarios
router.get('/', authMiddleware, usuarioController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', authMiddleware, usuarioController.getUserById);

// Ruta para actualizar un usuario existente
router.put('/:id', authMiddleware, usuarioController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', authMiddleware, usuarioController.deleteUser);

module.exports = router;
