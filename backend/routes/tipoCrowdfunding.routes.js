const express = require('express');
const router = express.Router();
const tipoCrowdfundingController = require('../controllers/tipoCrowdfunding.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');

router.get('/', tipoCrowdfundingController.getTiposCrowdfunding);
router.get('/:id', tipoCrowdfundingController.getTipoCrowdfundingById);


//Rutas Protegidas: Solo administradores pueden crear, actualizar o eliminar tipos de crowdfunding
router.post(
  '/',
  authMiddleware,
  [
    body('nombre').notEmpty().withMessage('El campo "nombre" es obligatorio.'),
    body('nombre').isLength({ max: 50 }).withMessage('El campo "nombre" no debe exceder 50 caracteres.'),
    body('descripcion').optional().isLength({ max: 255 }).withMessage('El campo "descripcion" no debe exceder 255 caracteres.')
  ],
  tipoCrowdfundingController.createTipoCrowdfunding
);

router.put(
  '/:id',
  authMiddleware,
  [
    body('nombre').notEmpty().withMessage('El campo "nombre" es obligatorio.'),
    body('nombre').isLength({ max: 50 }).withMessage('El campo "nombre" no debe exceder 50 caracteres.'),
    body('descripcion').optional().isLength({ max: 255 }).withMessage('El campo "descripcion" no debe exceder 255 caracteres.')
  ],
  tipoCrowdfundingController.updateTipoCrowdfunding
);

router.delete('/:id', authMiddleware, tipoCrowdfundingController.deleteTipoCrowdfunding);

module.exports = router;
