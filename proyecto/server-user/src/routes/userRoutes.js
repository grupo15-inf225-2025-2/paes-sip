import express from 'express';
import {
  getusuarios,
  createusuario,
  getusuarioById,
  updateusuario,
  deleteusuario,
  loginUser
} from '../controllers/userController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', loginUser);
router.post('/register', createusuario);

// Rutas CRUD
router.get('/', getusuarios);
router.get('/:id', getusuarioById);
router.put('/:id', updateusuario);
router.delete('/:id', deleteusuario);

export default router;