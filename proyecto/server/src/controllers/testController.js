import Ensayo   from '../models/testModel.js';
import Pregunta from '../models/questionModel.js';

// GET todos
export const getTests = async (_, res) => {
  try {
    const ensayos = await Ensayo.findAll();
    const withDetails = await Promise.all(
      ensayos.map(async e => ({
        ...e.toJSON(),
        preguntas: await Pregunta.findAll({ where: { id: e.preguntas } })
      }))
    );
    res.status(200).json(withDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET por ID
export const getTestById = async (req, res) => {
  try {
    const ensayo = await Ensayo.findByPk(req.params.id);
    if (!ensayo) return res.status(404).json({ error: 'Ensayo no encontrado' });

    const preguntas = await Pregunta.findAll({ where: { id: ensayo.preguntas } });
    res.json({ ...ensayo.toJSON(), preguntas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST crear
export const createTest = async (req, res) => {
  try {
    const { titulo, descripcion, preguntas } = req.body;
    if (!Array.isArray(preguntas)) {
      return res.status(400).json({ error: 'preguntas debe ser un array de IDs' });
    }
    const ensayo = await Ensayo.create({ titulo, descripcion, preguntas });
    res.status(201).json(ensayo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT actualizar
export const updateTest = async (req, res) => {
  try {
    const ensayo = await Ensayo.findByPk(req.params.id);
    if (!ensayo) return res.status(404).json({ error: 'Ensayo no encontrado' });

    const { titulo, descripcion, preguntas } = req.body;
    if (titulo !== undefined) ensayo.titulo = titulo;
    if (descripcion !== undefined) ensayo.descripcion = descripcion;
    if (preguntas !== undefined) {
      if (!Array.isArray(preguntas)) {
        return res.status(400).json({ error: 'preguntas debe ser un array de IDs' });
      }
      ensayo.preguntas = preguntas;
    }
    await ensayo.save();
    res.json(ensayo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteTest = async (req, res) => {
  try {
    const ensayo = await Ensayo.findByPk(req.params.id);
    if (!ensayo) return res.status(404).json({ error: 'Ensayo no encontrado' });

    await ensayo.destroy();
    res.json({ message: `Ensayo ${req.params.id} eliminado` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
