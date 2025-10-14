import fs from 'fs';
import path from 'path';


const dataDir = path.resolve('server/src/data');
const dataPath = path.join(dataDir, 'ensayos.json');


if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}


export const saveResult = (req, res) => {
  try {
    const { materia, respuestas, puntaje, correctas, total } = req.body;

    
    if (!materia || !respuestas) {
      return res.status(400).json({ error: 'Faltan datos requeridos (materia o respuestas).' });
    }

    
    const nuevoIntento = {
      id: Date.now(),
      materia,
      fecha: new Date().toISOString(),
      respuestas,
      puntaje,
      correctas,
      total
    };

    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.push(nuevoIntento);

    
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(201).json({
      message: '✅ Intento guardado correctamente',
      intento: nuevoIntento
    });
  } catch (error) {
    console.error('❌ Error al guardar intento:', error);
    res.status(500).json({ error: 'Error al guardar el intento.' });
  }
};


export const listResults = (req, res) => {
  try {
    if (!fs.existsSync(dataPath)) {
      return res.status(200).json([]);
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Error al listar resultados:', error);
    res.status(500).json({ error: 'Error al obtener los resultados.' });
  }
};

