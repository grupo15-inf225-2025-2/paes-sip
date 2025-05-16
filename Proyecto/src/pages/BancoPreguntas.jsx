import { useState } from 'react'
import '../assets/css/BancoPreguntas.css'

export default function BancoPreguntas() {
  const [question, setQuestion] = useState({
    text: '',
    points: 1,
    correctOption: null
  })
  
  const [options, setOptions] = useState([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' }
  ])

  const handleOptionChange = (id, value) => {
    setOptions(options.map(opt => 
      opt.id === id ? { ...opt, text: value } : opt
    ))
  }

  const handleCorrectAnswer = (id) => {
    setQuestion({ ...question, correctOption: id })
  }

  const handlePointsChange = (e) => {
    const points = parseInt(e.target.value) || 0
    setQuestion({ ...question, points: points > 0 ? points : 1 })
  }

  const saveQuestion = () => {
    const questionData = {
      question: question.text,
      options: options,
      correctOption: question.correctOption,
      points: question.points
    }
    console.log("Datos guardados:", questionData)
    alert(`Pregunta guardada:
      - Pregunta: ${question.text}
      - Puntos: ${question.points}
      - Respuesta correcta: Opción ${question.correctOption}
    `)
  }

  return (
    <div className="app-container">
      <h1>Administrador de Preguntas</h1>
      <div className='cont'>
        <h2>Crear pregunta</h2>
        <div className="pregunta">
          <label htmlFor="question">Pregunta:</label>
          <textarea
            id="question"
            value={question.text}
            onChange={(e) => setQuestion({...question, text: e.target.value})}
            placeholder="Escribe tu pregunta aquí..."
            rows={3}
          />
          
          <div className="points-input">
            <label htmlFor="points">Puntaje:</label>
            <input
              type="number"
              id="points"
              min="1"
              value={question.points}
              onChange={handlePointsChange}
            />
            <span>puntos</span>
          </div>
        </div>
      
      {options.map((option) => (
        <div 
          key={option.id} 
          className={`card ${question.correctOption === option.id ? 'correct' : ''}`}
        >
          <label htmlFor={`option-${option.id}`}>Opción {option.id}:</label>
          <div className="option-container">
            <textarea
              id={`option-${option.id}`}
              value={option.text}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              placeholder={`Escribe la opción ${option.id} aquí...`}
              rows={2}
            />
            <button
              onClick={() => handleCorrectAnswer(option.id)}
              className={`select-button ${question.correctOption === option.id ? 'selected' : ''}`}
            >
              {question.correctOption === option.id ? '✓ Correcta' : 'Marcar como correcta'}
            </button>
          </div>
        </div>
      ))}
      </div>
      <div className="preview">
        <h2>Resumen:</h2>
        <div className='card'>
          <p><strong>Pregunta:</strong> {question.text || '[Sin texto]'}</p>
          <p><strong>Puntos:</strong> {question.points}</p>
          <p><strong>Respuesta correcta:</strong> {question.correctOption ? `Opción ${question.correctOption}` : 'No seleccionada'}</p>
        </div>
        <button 
          onClick={saveQuestion}
          disabled={!question.text || !question.correctOption}
          className="save-button"
        >
          Guardar Pregunta
        </button>
      </div>
    </div>
  )
}