import { useState, useEffect } from 'react';
import '../assets/css/CreadorPreguntas.css';
import Header from '../components/Header';

export default function BancoPreguntas() {
  const [filters, setFilters] = useState({
    subject: '',
    thematicAxis: '',
    skill: '',
    keyword: ''
  });
  const [newTest, setNewTest] = useState({
    title: '',
    description: '',
    questions: []
  });

  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const [questionBank, setQuestionBank] = useState([
    {
      id: 1,
      subject: 'Matemáticas',
      thematicAxis: 'Álgebra',
      skill: 'Resolución de problemas',
      keywords: ['ecuaciones', 'lineales'],
      question: 'Resuelve la ecuación: 2x + 5 = 15',
      options: ['5', '10', '7.5', '20'],
      correctAnswer: 0,
      points: 2
    },
    {
      id: 2,
      subject: 'Lenguaje',
      thematicAxis: 'Comprensión lectora',
      skill: 'Inferencia',
      keywords: ['texto', 'inferir'],
      question: '¿Qué se puede inferir del siguiente texto...?',
      options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 3,
      subject: 'Ciencias',
      thematicAxis: 'Biología',
      skill: 'Análisis experimental',
      keywords: ['célula', 'membrana'],
      question: 'La función principal de la membrana celular es:',
      options: ['Producción de energía', 'Protección del núcleo', 'Control del paso de sustancias', 'Síntesis de proteínas'],
      correctAnswer: 2,
      points: 1
    }
  ]);

  useEffect(() => {
    const filtered = questionBank.filter(q => {
      return (
        (filters.subject === '' || q.subject === filters.subject) &&
        (filters.thematicAxis === '' || q.thematicAxis === filters.thematicAxis) &&
        (filters.skill === '' || q.skill === filters.skill) &&
        (filters.keyword === '' || q.keywords.some(kw => kw.includes(filters.keyword.toLowerCase()))))
      });
    setFilteredQuestions(filtered);
  }, [filters, questionBank]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const addQuestionToTest = (questionId) => {
    if (!newTest.questions.includes(questionId)) {
      setNewTest({
        ...newTest,
        questions: [...newTest.questions, questionId]
      });
    }
  };

  const removeQuestionFromTest = (questionId) => {
    setNewTest({
      ...newTest,
      questions: newTest.questions.filter(id => id !== questionId)
    });
  };

  const saveTest = () => {
    if (newTest.questions.length === 0) {
      alert('Debe agregar al menos una pregunta al ensayo');
      return;
    }
    
    const testData = {
      ...newTest,
      totalPoints: newTest.questions.reduce((total, qId) => {
        const q = questionBank.find(q => q.id === qId);
        return total + (q?.points || 0);
      }, 0),
      questions: newTest.questions.map(qId => {
        const q = questionBank.find(q => q.id === qId);
        return {
          id: q.id,
          question: q.question,
          points: q.points
        };
      })
    };
    
    console.log('Ensayo guardado:', testData);
    alert(`Ensayo "${testData.title}" guardado con ${testData.questions.length} preguntas y ${testData.totalPoints} puntos totales`);
  };

  const uniqueSubjects = [...new Set(questionBank.map(q => q.subject))];
  const uniqueThematicAxes = [...new Set(questionBank.map(q => q.thematicAxis))];
  const uniqueSkills = [...new Set(questionBank.map(q => q.skill))];

  return (
    <>
    <Header/>
    <div className="app-container">
      <h1>Banco de Preguntas PAES</h1>

      <div className="filters-section">
        <h2>Filtrar Preguntas</h2>
        <div className="filter-grid">
          <div className="filter-group">
            <label>Asignatura:</label>
            <select 
              name="subject" 
              value={filters.subject}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              {uniqueSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Eje temático:</label>
            <select 
              name="thematicAxis" 
              value={filters.thematicAxis}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              {uniqueThematicAxes.map(axis => (
                <option key={axis} value={axis}>{axis}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Habilidad evaluada:</label>
            <select 
              name="skill" 
              value={filters.skill}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              {uniqueSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Palabra clave:</label>
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Escribe una palabra clave"
            />
          </div>
        </div>
      </div>
      <div className="questions-section">
        <div className='filters-section'>
          <h2>Preguntas Disponibles ({filteredQuestions.length})</h2>
          <div className="questions-grid">
            {filteredQuestions.map(question => (
              <div key={question.id} className="question-card">
                <div className="question-header">
                  <span className="subject-badge">{question.subject}</span>
                  <span className="points-badge">{question.points} pts</span>
                </div>
                <h3>{question.question}</h3>
                <ul className="options-list">
                  {question.options.map((option, index) => (
                    <li 
                      key={index}
                      className={index === question.correctAnswer ? 'correct-option' : ''}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                <div className="question-footer">
                  <span className="skill-tag">{question.skill}</span>
                  <button 
                    onClick={() => addQuestionToTest(question.id)}
                    disabled={newTest.questions.includes(question.id)}
                  >
                    {newTest.questions.includes(question.id) ? '✓ Agregada' : 'Agregar al ensayo'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="test-section">
        <h2>Ensayo en Creación</h2>
        <div className="test-form">
          <div className="form-group">
            <label>Título del ensayo:</label>
            <input
              type="text"
              value={newTest.title}
              onChange={(e) => setNewTest({...newTest, title: e.target.value})}
              placeholder="Ej: Ensayo PAES Matemáticas 2023"
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              value={newTest.description}
              onChange={(e) => setNewTest({...newTest, description: e.target.value})}
              placeholder="Descripción del ensayo..."
              rows={3}
            />
          </div>
          
          <div className="selected-questions">
            <h3>Preguntas seleccionadas ({newTest.questions.length})</h3>
            <div className="questions-list">
              {newTest.questions.length === 0 ? (
                <p className="empty-message">No hay preguntas seleccionadas</p>
              ) : (
                <ul>
                  {newTest.questions.map(qId => {
                    const q = questionBank.find(q => q.id === qId);
                    return q ? (
                      <li key={q.id}>
                        <span>{q.question}</span>
                        <span className="question-points">{q.points} pts</span>
                        <button onClick={() => removeQuestionFromTest(q.id)}>×</button>
                      </li>
                    ) : null;
                  })}
                </ul>
              )}
            </div>
            
            <div className="test-summary">
              <p>Total de preguntas: <strong>{newTest.questions.length}</strong></p>
              <p>Puntaje total: <strong>
                {newTest.questions.reduce((total, qId) => {
                  const q = questionBank.find(q => q.id === qId);
                  return total + (q?.points || 0);
                }, 0)}
              </strong> puntos</p>
            </div>
            
            <button 
              onClick={saveTest}
              disabled={newTest.questions.length === 0 || !newTest.title}
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

