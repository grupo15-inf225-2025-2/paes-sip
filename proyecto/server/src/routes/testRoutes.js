import express from 'express';
import { createTest, deleteTest, getTestById, getTests, updateTest } from '../controllers/testController.js';

const router = express.Router();

router.get('/', getTests);
router.get('/:id', getTestById);
router.post('/', createTest);
router.delete('/:id', deleteTest);
router.put('/:id', updateTest);

export default router;