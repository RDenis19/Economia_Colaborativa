const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/auth', authController.iniciarSesion);

module.exports = router;