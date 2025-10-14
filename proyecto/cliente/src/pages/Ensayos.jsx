import { useState, useEffect } from 'react';

import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

import '../assets/css/Ensayo.css';
import Header from "../components/Header";

export default function Ensayos() {
    const initialTime = 15 * 60;
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [examStarted, setExamStarted] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [examFinished, setExamFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});

    // Banco de preguntas por materia con respuestas correctas
    const questionBanks = {
        matematicas: [
            {
                formula: '0,25+0,355-1,2+3,123-0,315',
                options: [
                    { key: 'a', text: '2,213' },
                    { key: 'b', text: '2,843' },
                    { key: 'c', text: '3,728' },
                    { key: 'd', text: '4,530' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // 2,213
                score: 1
            },
            {
                formula: '\\frac{2}{3} + \\frac{1}{4}',
                options: [
                    { key: 'a', text: '\\frac{11}{12}' },
                    { key: 'b', text: '\\frac{3}{7}' },
                    { key: 'c', text: '\\frac{5}{6}' },
                    { key: 'd', text: '\\frac{7}{8}' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // 11/12
                score: 1
            },
            {
                formula: '2x + 5 = 13',
                question: 'Encuentra el valor de x en la ecuación:',
                options: [
                    { key: 'a', text: 'x = 3' },
                    { key: 'b', text: 'x = 4' },
                    { key: 'c', text: 'x = 5' },
                    { key: 'd', text: 'x = 6' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'b', // x = 4
                score: 1
            }
        ],
        lenguaje: [
            {
                question: '¿Cuál es el sujeto en la oración "Los estudiantes prepararon sus ensayos"?',
                options: [
                    { key: 'a', text: 'Los estudiantes' },
                    { key: 'b', text: 'prepararon' },
                    { key: 'c', text: 'sus ensayos' },
                    { key: 'd', text: 'estudiantes' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // Los estudiantes
                score: 1
            },
            {
                question: 'Identifica la figura literaria en: "Sus ojos eran dos luceros"',
                options: [
                    { key: 'a', text: 'Metáfora' },
                    { key: 'b', text: 'Símil' },
                    { key: 'c', text: 'Hipérbole' },
                    { key: 'd', text: 'Personificación' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // Metáfora
                score: 1
            },
            {
                question: '¿Cuál es la función de la coma en "María, ven acá"?',
                options: [
                    { key: 'a', text: 'Separar elementos de una serie' },
                    { key: 'b', text: 'Indicar vocativo' },
                    { key: 'c', text: 'Separar oraciones' },
                    { key: 'd', text: 'Indicar pausa larga' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'b', // Indicar vocativo
                score: 1
            }
        ],
        ciencias: [
            {
                question: '¿Cuál es la fórmula química del agua?',
                options: [
                    { key: 'a', text: 'H₂O' },
                    { key: 'b', text: 'CO₂' },
                    { key: 'c', text: 'NaCl' },
                    { key: 'd', text: 'O₂' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // H₂O
                score: 1
            },
            {
                question: '¿Qué organelo celular es responsable de la respiración celular?',
                options: [
                    { key: 'a', text: 'Núcleo' },
                    { key: 'b', text: 'Mitocondria' },
                    { key: 'c', text: 'Cloroplasto' },
                    { key: 'd', text: 'Ribosoma' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'b', // Mitocondria
                score: 1
            },
            {
                question: '¿Cuál es la velocidad de la luz en el vacío?',
                options: [
                    { key: 'a', text: '300.000 km/s' },
                    { key: 'b', text: '150.000 km/s' },
                    { key: 'c', text: '450.000 km/s' },
                    { key: 'd', text: '200.000 km/s' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // 300.000 km/s
                score: 1
            }
        ]
    };

    // Obtener preguntas según la materia seleccionada
    const questions = selectedSubject ? questionBanks[selectedSubject] : [];
    
    // Cálculo del progreso en porcentaje
    const progress = questions.length > 0 ? ((activeQuestion + 1) / questions.length) * 100 : 0;
    
    // Formatea segundos a mm:ss
    const formatTime = seconds => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Calcular puntaje obtenido
    const calculateScore = () => {
        let correctAnswers = 0;
        let totalScore = 0;
        
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            if (userAnswer === question.correctAnswer) {
                correctAnswers++;
                totalScore += question.score;
            }
        });
        
        return { correctAnswers, totalScore, totalQuestions: questions.length };
    };

    // Efecto para el temporizador - solo se activa cuando el examen ha comenzado
    useEffect(() => {
        if (!timerActive || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setTimerActive(false);
                    finishExam(); // Finalizar automáticamente cuando se acaba el tiempo
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);

    // Función para iniciar el ensayo
    const startExam = (subject) => {
        setSelectedSubject(subject);
        setExamStarted(true);
        setExamFinished(false);
        setTimerActive(true);
        setActiveQuestion(0);
        setTimeLeft(initialTime);
        setUserAnswers({});
    };

    // Función para finalizar el ensayo
    
    const finishExam = async () => {
        setExamFinished(true);
        setTimerActive(false);

    
        const { correctAnswers, totalScore, totalQuestions } = calculateScore();

    // Crear el objeto con la información del intento
        const intento = {
            materia: selectedSubject,
            respuestas: userAnswers,
            puntaje: totalScore,
            correctas: correctAnswers,
            total: totalQuestions
        };

        console.log("🧩 Enviando intento al backend:", intento);

        try {
            const response = await fetch("http://localhost:3001/api/resultados/guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(intento)
            });

            const data = await response.json();
            console.log("✅ Resultado guardado correctamente:", data);
        } catch (error) {
            console.error("❌ Error al guardar resultado:", error);
        }   
    };



    // Función para reiniciar
    const resetExam = () => {
        setSelectedSubject(null);
        setExamStarted(false);
        setExamFinished(false);
        setTimerActive(false);
        setActiveQuestion(0);
        setTimeLeft(initialTime);
        setUserAnswers({});
    };

    // Manejar selección de respuesta
    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption
        }));
    };

    // Manejadores de navegación
    const goToQuestion = index => {
        if (index < 0 || index >= questions.length) return;
        setActiveQuestion(index);
    };

    const nextQuestion = () => goToQuestion(activeQuestion + 1);
    const prevQuestion = () => goToQuestion(activeQuestion - 1);

    // Pantalla de resultados
    if (examFinished) {
        const { correctAnswers, totalScore, totalQuestions } = calculateScore();
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);

        return (
            <>
                <Header />
                <div className="container">
                    <div className="results-container">
                        <h2>Resultados del Ensayo de {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}</h2>
                        
                        {/* Resumen de resultados */}
                        <div className="results-summary">
                            <div className="score-display">
                                <h3>Tu Puntaje: {totalScore} / {totalQuestions} puntos</h3>
                                <p>Respuestas correctas: {correctAnswers} de {totalQuestions} ({percentage}%)</p>
                            </div>
                        </div>

                        {/* Revisión detallada */}
                        <div className="detailed-results">
                            <h4>Revisión detallada:</h4>
                            {questions.map((question, index) => {
                                const userAnswer = userAnswers[index];
                                const isCorrect = userAnswer === question.correctAnswer;
                                const correctOption = question.options.find(opt => opt.key === question.correctAnswer);
                                const userOption = question.options.find(opt => opt.key === userAnswer);

                                return (
                                    <div key={index} className={`result-question ${isCorrect ? 'correct' : 'incorrect'}`}>
                                        <div className="question-header">
                                            <h5>Pregunta {index + 1} {isCorrect ? '✅' : '❌'}</h5>
                                        </div>
                                        
                                        <div className="question-text">
                                            {question.question && (
                                                <p>{question.question}</p>
                                            )}
                                            {question.formula && !question.question && (
                                                <p>Al resolver <InlineMath math={question.formula} /> se obtiene:</p>
                                            )}
                                            {question.formula && question.question && (
                                                <p><InlineMath math={question.formula} /></p>
                                            )}
                                        </div>

                                        <div className="answer-comparison">
                                            <div className="user-answer">
                                                <strong>Tu respuesta:</strong> 
                                                {userAnswer ? (
                                                    <span className={isCorrect ? 'correct-answer' : 'wrong-answer'}>
                                                        {userOption?.key}) {userOption?.text.includes('\\') ? 
                                                            <InlineMath math={userOption.text} /> : 
                                                            userOption?.text
                                                        }
                                                    </span>
                                                ) : (
                                                    <span className="no-answer">Sin respuesta</span>
                                                )}
                                            </div>
                                            
                                            <div className="correct-answer-display">
                                                <strong>Respuesta correcta:</strong> 
                                                <span className="correct-answer">
                                                    {correctOption?.key}) {correctOption?.text.includes('\\') ? 
                                                        <InlineMath math={correctOption.text} /> : 
                                                        correctOption?.text
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="results-actions">
                            <button className="btn btn-primary" onClick={resetExam}>
                                Realizar otro ensayo
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Pantalla de selección de materia
    if (!examStarted) {
        return (
            <>
                <Header />
                <div className="container">
                    <div className="subject-selection">
                        <h2>Selecciona el tipo de ensayo</h2>
                        <div className="subject-cards">
                            {/* Recuadro Matemáticas - Azul */}
                            <div className="subject-card mathematics">
                                <div className="subject-content">
                                    <div className="subject-icon">📊</div>
                                    <h3>Matemáticas</h3>
                                    <p>Álgebra, aritmética y geometría</p>
                                    <div className="question-count">{questionBanks.matematicas.length} preguntas</div>
                                </div>
                                <button 
                                    className="start-exam-btn"
                                    onClick={() => startExam('matematicas')}
                                >
                                    Iniciar Ensayo
                                </button>
                            </div>
                            
                            {/* Recuadro Lenguaje - Rojo */}
                            <div className="subject-card language">
                                <div className="subject-content">
                                    <div className="subject-icon">📝</div>
                                    <h3>Lenguaje</h3>
                                    <p>Gramática, literatura y comprensión</p>
                                    <div className="question-count">{questionBanks.lenguaje.length} preguntas</div>
                                </div>
                                <button 
                                    className="start-exam-btn"
                                    onClick={() => startExam('lenguaje')}
                                >
                                    Iniciar Ensayo
                                </button>
                            </div>
                            
                            {/* Recuadro Ciencias - Verde */}
                            <div className="subject-card science">
                                <div className="subject-content">
                                    <div className="subject-icon">🔬</div>
                                    <h3>Ciencias</h3>
                                    <p>Física, química y biología</p>
                                    <div className="question-count">{questionBanks.ciencias.length} preguntas</div>
                                </div>
                                <button 
                                    className="start-exam-btn"
                                    onClick={() => startExam('ciencias')}
                                >
                                    Iniciar Ensayo
                                </button>
                            </div>
                        </div>
                        
                        <div className="exam-info">
                            <h4>Información del ensayo:</h4>
                            <ul>
                                <li>⏱️ Tiempo límite: 15 minutos</li>
                                <li>📋 El temporizador comenzará automáticamente</li>
                                <li>✅ Puedes omitir preguntas</li>
                                <li>🔄 Puedes navegar entre preguntas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Pantalla del examen
    return (
        <>
            <Header />
            <div className="container">
                {/* Header del examen con materia seleccionada */}
                <div className="exam-header">
                    <h2>Ensayo de {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}</h2>
                    <div className="exam-actions">
                        <button className="btn-finish" onClick={finishExam}>
                            Terminar ensayo
                        </button>
                        <button className="btn-reset" onClick={resetExam}>
                            Cambiar materia
                        </button>
                    </div>
                </div>

                {/* Temporizador */}
                <section className="timer" aria-label="Temporizador">
                    <span className="timer-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8 8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"></path>
                            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                        </svg>
                    </span>
                    <div className={`timer-display ${timeLeft < 60 ? 'timer-warning' : ''}`}>
                        {formatTime(timeLeft)}
                    </div>
                    {!timerActive && timeLeft === 0 && (
                        <div className="timer-expired">¡Tiempo agotado!</div>
                    )}
                </section>

                {/* Barra de progreso */}
                <div className="progress-container" aria-label="Barra de progreso">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                    <div className="progress-text">
                        Pregunta {activeQuestion + 1} de {questions.length}
                    </div>
                </div>

                {/* Navegación de preguntas */}
                <nav className="questions-nav" aria-label="Navegación de preguntas">
                    <ul>
                        {questions.map((_, idx) => (
                            <li key={idx}>
                                <a
                                    href="#"
                                    className={`${idx === activeQuestion ? 'active' : ''} ${userAnswers[idx] ? 'answered' : ''}`}
                                    onClick={e => { e.preventDefault(); goToQuestion(idx); }}
                                    aria-label={`pregunta ${idx + 1}`}
                                    aria-current={idx === activeQuestion ? 'true' : undefined}
                                >
                                    {idx + 1}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href="#" title="Información" aria-label="Información de sección">ℹ</a>
                        </li>
                    </ul>
                </nav>

                {/* Contenedor de la pregunta actual */}
                {questions.length > 0 && (
                    <article
                        className="question-container"
                        aria-label={`Pregunta número ${activeQuestion + 1}`}
                    >
                        <div className="question-number">{activeQuestion + 1}</div>
                        <div className="question-content">
                            <p>
                                {questions[activeQuestion].question && (
                                    questions[activeQuestion].question
                                )}
                                {questions[activeQuestion].formula && !questions[activeQuestion].question && (
                                    <>Al resolver <InlineMath math={questions[activeQuestion].formula} /> se obtiene:</>
                                )}
                                {questions[activeQuestion].formula && questions[activeQuestion].question && (
                                    <><br/><InlineMath math={questions[activeQuestion].formula} /></>
                                )}
                            </p>
                        </div>

                        <ul className="options-list">
                            {questions[activeQuestion].options.map(opt => (
                                <li key={opt.key} className="option-item">
                                    <div className="option-container">
                                        {opt.key !== 'skip' && (
                                            <div className="option-label">{opt.key})</div>
                                        )}
                                        <div className="option-content">
                                            <input
                                                type="radio"
                                                id={`option-${opt.key}`}
                                                name={`question-${activeQuestion}`}
                                                className="option-input"
                                                checked={userAnswers[activeQuestion] === opt.key}
                                                onChange={() => handleAnswerSelect(activeQuestion, opt.key)}
                                            />
                                            <label htmlFor={`option-${opt.key}`} className="option-custom-radio">
                                                <span className="marker" />
                                                <div>
                                                    {opt.text.includes('\\') ? (
                                                        <InlineMath math={opt.text} />
                                                    ) : (
                                                        opt.text
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="points-display">
                            <p>Puntaje: {questions[activeQuestion].score} pts</p>
                        </div>
                    </article>
                )}

                {/* Botones de navegación */}
                <footer className="buttons-container">
                    <button
                        className="btn btn-primary"
                        onClick={prevQuestion}
                        disabled={activeQuestion === 0}
                    >
                        Pregunta anterior
                        <span className="btn-icon"></span>
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={nextQuestion}
                        disabled={activeQuestion === questions.length - 1}
                    >
                        Siguiente pregunta
                        <span className="btn-icon"></span>
                    </button>
                </footer>
            </div>
        </>
    );
}