const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/', rolController.getRoles);
router.get('/:id', rolController.getRolById);

// Rutas protegidas: Solo administradores pueden crear, actualizar o eliminar roles
router.post('/', authMiddleware, rolController.createRol);
router.put('/:id', authMiddleware, rolController.updateRol);
router.delete('/:id', authMiddleware, rolController.deleteRol);

module.exports = router;
