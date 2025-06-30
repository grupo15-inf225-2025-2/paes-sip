import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import userRoutes from './routes/userRoutes.js'; // Nueva importación

const app = express();

// Middlewares esenciales
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a PostgreSQL e inicialización
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida');
    
    // Sincroniza modelos sin destruir datos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con PostgreSQL');

  } catch (error) {
    console.error('Error con PostgreSQL:', error);
    process.exit(1);
  }
};

app.use('/api/usuario', userRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

const startServer = async () => {
  await initializeDatabase();

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
    console.log(`API de preguntas disponible en http://localhost:${PORT}/api/pregunta`);
    console.log(`API de ensayos disponible en http://localhost:${PORT}/api/ensayo`);
    console.log(`API de usuarios disponible en http://localhost:${PORT}/api/usuario`);
  });
};

startServer();