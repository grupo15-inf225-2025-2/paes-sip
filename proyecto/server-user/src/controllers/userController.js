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
      const { nombre_usuario, contrasena, escuela, profesor } = req.body;
      
      // Verificar si el usuario ya existe
      const existingUser = await usuario.findOne({ where: { nombre_usuario } });
      if (existingUser) {
        return res.status(409).json({ message: 'El nombre de usuario ya existe' });
      }
      const newUser = await usuario.create({
        nombre_usuario,
        contrasena: contrasena,
        escuela,
        profesor
      });
      res.status(201).json({ message: 'Usuario creado correctamente', user: newUser }); 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

export const getusuarioById = async (req, res) => {
  try {
    // Obtener el ID del parámetro de la URL
    const userId = req.params.id;

    // Validar que el ID sea un número
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    // Buscar el usuario en la base de datos
    const usuarioEncontrado = await usuario.findByPk(userId, {
      attributes: { 
        exclude: ['contrasena'] // Siempre excluir la contraseña
      }
    });

    if (!usuarioEncontrado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuarioEncontrado);

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ 
      error: 'Error interno al obtener el usuario',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
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
export const loginUser = async (req, res) => {
  try {
    const { nombre_usuario, contrasena } = req.body;

    if (!nombre_usuario || !contrasena) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
    }

    const user = await usuario.findOne({ where: { nombre_usuario } });
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (contrasena !== user.contrasena) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const userWithoutPassword = {
      id: user.id,
      nombre_usuario: user.nombre_usuario,
      escuela: user.escuela,
      profesor: user.profesor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({ 
      success: true,
      message: 'Login exitoso',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
