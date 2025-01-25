const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/login', usuarioController.iniciarSesion);

module.exports = router;