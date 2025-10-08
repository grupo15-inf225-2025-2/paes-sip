import express from 'express';
import { getQuestions, createQuestion, deleteQuestion, updateQuestion } from '../controllers/questionController.js';

const router = express.Router();

router.get('/', getQuestions);
router.post('/', createQuestion);
router.delete('/:id', deleteQuestion);
router.put('/:id', updateQuestion);

export default router;