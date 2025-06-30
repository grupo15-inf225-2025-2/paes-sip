import usuario from '../models/userModel.js';

// Obtener todos los usuarios
export const getusuarios = async (req, res) => {
  try {
    const usuarios = await usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
export const createusuario = async (req, res) => {
  try {
    // En producción, aquí deberías hashear la contraseña antes de guardarla
    const usuario = await usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un usuario específico por ID
export const getusuarioById = async (req, res) => {
  try {
    const usuario = await usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
export const updateusuario = async (req, res) => {
  try {
    const [updated] = await usuario.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedusuario = await usuario.findByPk(req.params.id);
      return res.json(updatedusuario);
    }
    res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
export const deleteusuario = async (req, res) => {
  try {
    const deleted = await usuario.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Usuario eliminado correctamente' });
    }
    res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};