import express from 'express';
import { createTest, deleteTest, getTests, updateTest } from '../controllers/testController.js';

const router = express.Router();

router.get('/', getTests);
router.post('/', createTest);
router.delete('/:id', deleteTest);
router.put('/:id', updateTest);

export default router;