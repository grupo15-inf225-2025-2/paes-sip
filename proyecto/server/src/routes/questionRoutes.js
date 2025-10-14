import express from 'express';
// 👇 ASEGÚRATE DE IMPORTAR LA NUEVA FUNCIÓN AQUÍ 👇
import { 
  getQuestions, 
  createQuestion, 
  deleteQuestion, 
  updateQuestion, 
  getQuestionById 
} from '../controllers/questionController.js';

const router = express.Router();

// --- Mapa de Rutas para la API de Preguntas ---

// GET /api/pregunta/ -> Obtiene todas las preguntas
router.get('/', getQuestions);

// POST /api/pregunta/ -> Crea una nueva pregunta
router.post('/', createQuestion);

// GET /api/pregunta/:id -> Obtiene una pregunta específica por su ID
router.get('/:id', getQuestionById);

// DELETE /api/pregunta/:id -> Elimina una pregunta
router.delete('/:id', deleteQuestion);

// PUT /api/pregunta/:id -> Actualiza una pregunta
router.put('/:id', updateQuestion);

export default router;