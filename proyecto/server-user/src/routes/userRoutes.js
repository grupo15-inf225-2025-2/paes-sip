import express from 'express';
import {
  getusuarios,
  createusuario,
  getusuarioById,
  updateusuario,
  deleteusuario
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getusuarios);
router.post('/', createusuario);
router.get('/:id', getusuarioById);
router.put('/:id', updateusuario);
router.delete('/:id', deleteusuario);

export default router;