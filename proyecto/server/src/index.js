import express from 'express';
import cors from 'cors';
import sequelize from './db.js';

// Importar rutas existentes
import questionRoutes from './routes/questionRoutes.js';
import testRoutes from './routes/testRoutes.js';

// Nueva ruta para guardar resultados
import resultRoutes from './routes/resultRoutes.js';


const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a PostgreSQL e inicialización
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida');
    
    // Sincroniza modelos sin destruir datos existentes
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados con PostgreSQL');

  } catch (error) {
    console.error('❌ Error con PostgreSQL:', error);
    process.exit(1);
  }
};

//Configuración de rutas API
app.use('/api/pregunta', questionRoutes);
app.use('/api/ensayo', testRoutes);
app.use('/api/resultados', resultRoutes); // 👈 NUEVA RUTA para guardar intentos en JSON

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando correctamente' });
});


app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});


const startServer = async () => {
  await initializeDatabase();

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
    console.log(`📘 API de preguntas:   http://localhost:${PORT}/api/pregunta`);
    console.log(`📗 API de ensayos:     http://localhost:${PORT}/api/ensayo`);
    console.log(`📙 API de resultados:  http://localhost:${PORT}/api/resultados/guardar-intento`);
  });
};

startServer();
