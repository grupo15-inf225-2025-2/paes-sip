import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/CreadorPreguntas.css';
import Header from '../components/Header';

export default function BancoPreguntas() {
  const [filters, setFilters] = useState({
    asignatura: '',
    tematica: '',
    habilidad: '',
    etiqueta: ''
  });
  const [newTest, setNewTest] = useState({
    titulo: '',
    descripcion: '',
    preguntas: []
  });

  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pregunta');
        setQuestionBank(response.data);
        setFilteredQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las preguntas');
        setLoading(false);
        console.error('Error fetching questions:', err);
      }
    };
    
    fetchQuestions();
  }, []);

  // Filtrar preguntas
  useEffect(() => {
    if (questionBank.length > 0) {
      const filtered = questionBank.filter(q => {
        return (
          (filters.asignatura === '' || q.asignatura === filters.asignatura) &&
          (filters.tematica === '' || q.tematica === filters.tematica) &&
          (filters.habilidad === '' || q.habilidad === filters.habilidad) &&
          (filters.etiqueta === '' || 
            (q.etiquetas && q.etiquetas.some(etq => etq.includes(filters.etiqueta.toLowerCase())))
        ));
      });
      setFilteredQuestions(filtered);
    }
  }, [filters, questionBank]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const addQuestionToTest = (preguntaId) => {
    if (!newTest.preguntas.includes(preguntaId)) {
      setNewTest({
        ...newTest,
        preguntas: [...newTest.preguntas, preguntaId]
      });
    }
  };

  const removeQuestionFromTest = (preguntaId) => {
    setNewTest({
      ...newTest,
      preguntas: newTest.preguntas.filter(id => id !== preguntaId)
    });
  };

  const saveTest = async () => {
    if (newTest.preguntas.length === 0) {
      alert('Debe agregar al menos una pregunta al ensayo');
      return;
    }

    const testData = {
      titulo: newTest.titulo,
      descripcion: newTest.descripcion,
      puntos: newTest.preguntas.reduce((total, qId) => {
        const q = questionBank.find(q => q.id === qId);
        return total + (q?.puntos || 0);
      }, 0),
      preguntas: newTest.preguntas.map(qId => {
        const q = questionBank.find(q => q.id === qId);
        return {
          id: q.id,
          pregunta: q.pregunta,
          puntos: q.puntos
        };
      })
    };

    try {
      await axios.post('http://localhost:3001/api/ensayo', testData);
      alert(`Ensayo "${testData.titulo}" guardado con ${testData.preguntas.length} preguntas y ${testData.puntos} puntos totales`);
      
      setNewTest({
        titulo: '',
        descripcion: '',
        preguntas: []
      });
    } catch (err) {
      console.error('Error saving test:', err);
      alert('Error al guardar el ensayo');
    }
  };

  // Obtener valores únicos para los filtros
  const uniqueAsignaturas = [...new Set(questionBank.map(q => q.asignatura))];
  const uniqueTematicas = [...new Set(questionBank.map(q => q.tematica))];
  const uniqueHabilidades = [...new Set(questionBank.map(q => q.habilidad))];

  if (loading) return <div>Cargando preguntas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      <div className="app-container">
        <h1>Banco de Preguntas PAES</h1>

        <div className="filters-section">
          <h2>Filtrar Preguntas</h2>
          <div className="filter-grid">
            <div className="filter-group">
              <label>Asignatura:</label>
              <select
                name="asignatura"
                value={filters.asignatura}
                onChange={handleFilterChange}
              >
                <option value="">Todas</option>
                {uniqueAsignaturas.map(asignatura => (
                  <option key={asignatura} value={asignatura}>{asignatura}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Temática:</label>
              <select
                name="tematica"
                value={filters.tematica}
                onChange={handleFilterChange}
              >
                <option value="">Todas</option>
                {uniqueTematicas.map(tematica => (
                  <option key={tematica} value={tematica}>{tematica}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Habilidad:</label>
              <select
                name="habilidad"
                value={filters.habilidad}
                onChange={handleFilterChange}
              >
                <option value="">Todas</option>
                {uniqueHabilidades.map(habilidad => (
                  <option key={habilidad} value={habilidad}>{habilidad}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Etiqueta:</label>
              <input
                type="text"
                name="etiqueta"
                value={filters.etiqueta}
                onChange={handleFilterChange}
                placeholder="Escribe una etiqueta"
              />
            </div>
          </div>

          <div className="questions-section">
            <h2>Preguntas Disponibles ({filteredQuestions.length})</h2>
            <div className="questions-grid">
              {filteredQuestions.map(pregunta => (
                <div key={pregunta.id} className="question-card">
                  <div className="question-header">
                    <span className="subject-badge">{pregunta.asignatura}</span>
                    <span className="points-badge">{pregunta.puntos} pts</span>
                  </div>
                  {pregunta.pregunta}
                  <ul className="options-list">
                    {pregunta.opciones.map((opcion, index) => (
                      <li
                        key={index}
                        className={index === pregunta.correcta ? 'correct-option' : ''}
                      >
                        {opcion}
                      </li>
                    ))}
                  </ul>
                  <div className="question-footer">
                    <span className="skill-tag">{pregunta.habilidad}</span>
                    <button
                      onClick={() => addQuestionToTest(pregunta.id)}
                      disabled={newTest.preguntas.includes(pregunta.id)}
                    >
                      {newTest.preguntas.includes(pregunta.id) ? '✓ Agregada' : 'Agregar al ensayo'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="filters-section">
          <h2>Ensayo en Creación</h2>
          <div className="test-form">
            <div className="form-group">
              <label>Título del ensayo:</label>
              <input
                type="text"
                value={newTest.titulo}
                onChange={(e) => setNewTest({ ...newTest, titulo: e.target.value })}
                placeholder="Ej: Ensayo PAES Matemáticas 2025"
              />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                value={newTest.descripcion}
                onChange={(e) => setNewTest({ ...newTest, descripcion: e.target.value })}
                placeholder="Descripción del ensayo..."
                rows={3}
              />
            </div>

            <div className="selected-questions">
              <h3>Preguntas seleccionadas ({newTest.preguntas.length})</h3>
              <div className="questions-list">
                {newTest.preguntas.length === 0 ? (
                  <p className="empty-message">No hay preguntas seleccionadas</p>
                ) : (
                  <ul>
                    {newTest.preguntas.map(qId => {
                      const q = questionBank.find(q => q.id === qId);
                      return q ? (
                        <li key={q.id}>
                          <span>{q.pregunta}</span>
                          <span className="question-points">{q.puntos} pts</span>
                          <button onClick={() => removeQuestionFromTest(q.id)}>×</button>
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
              </div>

              <div className="test-summary">
                <p>Total de preguntas: <strong>{newTest.preguntas.length}</strong></p>
                <p>Puntaje total: <strong>
                  {newTest.preguntas.reduce((total, qId) => {
                    const q = questionBank.find(q => q.id === qId);
                    return total + (q?.puntos || 0);
                  }, 0)}
                </strong> puntos</p>
              </div>

              <button
                onClick={saveTest}
                disabled={newTest.preguntas.length === 0 || !newTest.titulo}
                className="save-test-btn"
              >
                Guardar Ensayo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}