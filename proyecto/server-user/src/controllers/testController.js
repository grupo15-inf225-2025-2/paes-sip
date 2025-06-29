import Ensayo from '../models/testModel.js';

export const createTest = async (req, res) => {
  try {
    const ensayo = await Ensayo.create(req.body);
    res.status(201).json(ensayo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTests = async (req, res) => {
  try {
    const ensayos = await Ensayo.findAll();
    res.json(ensayos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};