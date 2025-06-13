import Pregunta from '../models/questionModel.js';

export const getQuestions = async (req, res) => {
  try {
    const preguntas = await Pregunta.findAll();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const pregunta = await Pregunta.create(req.body);
    res.status(201).json(pregunta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};