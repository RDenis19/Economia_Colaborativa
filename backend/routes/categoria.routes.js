const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', categoriaController.getCategorias);
router.get('/:id', categoriaController.getCategoriaById);

router.post('/', authMiddleware, categoriaController.createCategoria);
router.put('/:id', authMiddleware, categoriaController.updateCategoria);
router.delete('/:id', authMiddleware, categoriaController.deleteCategoria);

module.exports = router;
