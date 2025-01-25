/* const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registro', usuarioController.registrarUsuario);

router.get('/', authMiddleware, usuarioController.obtenerUsuarios);
router.get('/:id', authMiddleware, usuarioController.obtenerUsuarioPorId);
router.put('/:id', authMiddleware, usuarioController.actualizarUsuario);
router.delete('/:id', authMiddleware, usuarioController.eliminarUsuario);

module.exports = router;
 */