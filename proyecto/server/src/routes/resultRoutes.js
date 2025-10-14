import express from 'express';
import { saveResult, listResults } from '../controllers/resultController.js';

const router = express.Router();

router.post('/guardar', saveResult);


router.get('/listar', listResults);

export default router;
