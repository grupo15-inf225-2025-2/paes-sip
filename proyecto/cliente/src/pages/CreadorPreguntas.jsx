import { useState } from 'react';
import axios from 'axios';
import '../assets/css/BancoPreguntas.css';
import Header from '../components/Header';

export default function CreadorPreguntas() {
  const [pregunta, setPregunta] = useState({
    asignatura: 'Matemáticas',
    tematica: '',
    habilidad: '',
    pregunta: '',
    puntos: 1,
    correcta: null,
    etiquetas: []
  });
  
  const [opciones, setOpciones] = useState([
    { id: 1, texto: '' },
    { id: 2, texto: '' },
    { id: 3, texto: '' },
    { id: 4, texto: '' }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Listas para los selectores
  const asignaturas = ['Matemáticas', 'Lenguaje', 'Ciencias', 'Historia'];
  const habilidades = ['Despejar X', 'Comprensión', 'Análisis', 'Cálculo'];

  const handleOpcionChange = (id, value) => {
    setOpciones(opciones.map(opt => 
      opt.id === id ? { ...opt, texto: value } : opt
    ));
  };

  const handleCorrectaChange = (id) => {
    setPregunta({ ...pregunta, correcta: id });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPregunta({ ...pregunta, [name]: value });
  };

  const handleEtiquetasChange = (e) => {
    const etiquetas = e.target.value.split(',').map(e => e.trim());
    setPregunta({ ...pregunta, etiquetas });
  };

  const guardarPregunta = async () => {
    // Validación básica
    if (!pregunta.pregunta || pregunta.correcta === null) {
      setError('Debes escribir una pregunta y marcar la respuesta correcta');
      return;
    }

    const preguntaData = {
      ...pregunta,
      opciones: opciones.map(o => o.texto),
      correcta: pregunta.correcta - 1,
      // Asegurar que las etiquetas sean un array
      etiquetas: Array.isArray(pregunta.etiquetas) ? pregunta.etiquetas : []
    };

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:3001/api/pregunta', preguntaData);
      
      if (response.status === 201) {
        setSuccess(true);
        // Resetear el formulario
        setPregunta({
          asignatura: 'Matemáticas',
          tematica: '',
          habilidad: '',
          pregunta: '',
          puntos: 1,
          correcta: null,
          etiquetas: []
        });
        setOpciones([
          { id: 1, texto: '' },
          { id: 2, texto: '' },
          { id: 3, texto: '' },
          { id: 4, texto: '' }
        ]);
        
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la pregunta');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="app-container">
        <h1>Administrador de Preguntas</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">¡Pregunta guardada correctamente!</div>}
        
        <div className='cont'>
          <h2>Crear nueva pregunta</h2>
          
          <div className="form-group">
            <label>Asignatura:</label>
            <select
              name="asignatura"
              value={pregunta.asignatura}
              onChange={handleInputChange}
            >
              {asignaturas.map(asig => (
                <option key={asig} value={asig}>{asig}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Temática:</label>
            <input
              type="text"
              name="tematica"
              value={pregunta.tematica}
              onChange={handleInputChange}
              placeholder="Ej: Álgebra, Geometría..."
            />
          </div>
          
          <div className="form-group">
            <label>Habilidad evaluada:</label>
            <select
              name="habilidad"
              value={pregunta.habilidad}
              onChange={handleInputChange}
            >
              <option value="">Seleccione una habilidad</option>
              {habilidades.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Pregunta:</label>
            <textarea
              name="pregunta"
              value={pregunta.pregunta}
              onChange={handleInputChange}
              placeholder="Escribe tu pregunta aquí..."
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label>Puntos:</label>
            <input
              type="number"
              name="puntos"
              min="1"
              value={pregunta.puntos}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Etiquetas (separadas por comas):</label>
            <input
              type="text"
              value={pregunta.etiquetas.join(', ')}
              onChange={handleEtiquetasChange}
              placeholder="Ej: ecuaciones, álgebra, lineal"
            />
          </div>
          
          <h3>Opciones de respuesta:</h3>
          {opciones.map((opcion) => (
            <div 
              key={opcion.id} 
              className={`card ${pregunta.correcta === opcion.id ? 'correct' : ''}`}
            >
              <label>Opción {opcion.id}:</label>
              <div className="option-container">
                <textarea
                  value={opcion.texto}
                  onChange={(e) => handleOpcionChange(opcion.id, e.target.value)}
                  placeholder={`Texto para opción ${opcion.id}...`}
                  rows={2}
                />
                <button
                  onClick={() => handleCorrectaChange(opcion.id)}
                  className={`select-button ${pregunta.correcta === opcion.id ? 'selected' : ''}`}
                >
                  {pregunta.correcta === opcion.id ? '✓ Correcta' : 'Marcar como correcta'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="preview">
          <h2>Resumen:</h2>
          <div className='card'>
            <p><strong>Asignatura:</strong> {pregunta.asignatura}</p>
            <p><strong>Temática:</strong> {pregunta.tematica || '[Sin especificar]'}</p>
            <p><strong>Habilidad:</strong> {pregunta.habilidad || '[Sin especificar]'}</p>
            <p><strong>Pregunta:</strong> {pregunta.pregunta || '[Sin texto]'}</p>
            <p><strong>Puntos:</strong> {pregunta.puntos}</p>
            <p><strong>Respuesta correcta:</strong> {pregunta.correcta ? `Opción ${pregunta.correcta}` : 'No seleccionada'}</p>
            <p><strong>Etiquetas:</strong> {pregunta.etiquetas.join(', ') || 'Ninguna'}</p>
          </div>
          
          <button 
            onClick={guardarPregunta}
            disabled={!pregunta.pregunta || pregunta.correcta === null || loading}
            className="save-button"
          >
            {loading ? 'Guardando...' : 'Guardar Pregunta'}
          </button>
        </div>
      </div>
    </>
  );
}