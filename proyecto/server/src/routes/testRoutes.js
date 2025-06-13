import express from 'express';
import { createTest, getTests } from '../controllers/testController.js';

const router = express.Router();

router.get('/', getTests);
router.post('/', createTest);

export default router;