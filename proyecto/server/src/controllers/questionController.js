import Pregunta from '../models/questionModel.js';

// Método GET
export const getQuestions = async (req, res) => {
  try {
    const preguntas = await Pregunta.findAll();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método POST
export const createQuestion = async (req, res) => {
  try {
    const pregunta = await Pregunta.create(req.body);
    res.status(201).json(pregunta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método DELETE
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const pregunta = await Pregunta.findByPk(id);
    if (!pregunta) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }

    await pregunta.destroy();
    res.status(200).json({ message: `Pregunta con ID ${id} eliminada correctamente.` });
  } catch (error) {
    console.error('Error al eliminar pregunta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Método PUT
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const pregunta = await Pregunta.findByPk(id);
    if (!pregunta) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }

    await pregunta.update(datosActualizados);

    res.status(200).json(pregunta);
  } catch (error) {
    console.error('Error al actualizar pregunta:', error);
    res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }
};
