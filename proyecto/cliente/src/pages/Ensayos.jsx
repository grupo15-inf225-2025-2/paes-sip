import { useState, useEffect } from 'react';

import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

import '../assets/css/Ensayo.css';
import Header from "../components/Header";

export default function Ensayos() {
    const initialTime = 15 * 60;
    const [timeLeft, setTimeLeft] = useState(initialTime);
    // Estado de la pregunta activa
    const [activeQuestion, setActiveQuestion] = useState(0);

    const questions = [
        {
            formula: '0,25+0,355-1,2+3,123-0,315',
            options: [
                { key: 'a', text: '2,213' },
                { key: 'b', text: '2,843' },
                { key: 'c', text: '3,728' },
                { key: 'd', text: '4,530' },
                { key: 'skip', text: 'Omitida' }
            ],
            score: 1
        }
    ];
    // Cálculo del progreso en porcentaje
    const progress = ((activeQuestion + 1) / questions.length) * 100;
    // Formatea segundos a mm:ss
    const formatTime = seconds => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Efecto para el temporizador
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Manejadores de navegación
    const goToQuestion = index => {
        if (index < 0 || index >= questions.length) return;
        setActiveQuestion(index);
    };

    const nextQuestion = () => goToQuestion(activeQuestion + 1);
    const prevQuestion = () => goToQuestion(activeQuestion - 1);

    return (
        <><Header /><div className="container">
            {/* Temporizador */}
            <section className="timer" aria-label="Temporizador">
                <span className="timer-icon">
                    {/* Icono de reloj */}
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"></path>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                    </svg>
                </span>
                <div className="timer-display">{formatTime(timeLeft)}</div>
            </section>

            {/* Barra de progreso */}
            <div className="progress-container" aria-label="Barra de progreso">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>

            {/* Navegación de preguntas */}
            <nav className="questions-nav" aria-label="Navegación de preguntas">
                <ul>
                    {questions.map((_, idx) => (
                        <li key={idx}>
                            <a
                                href="#"
                                className={idx === activeQuestion ? 'active' : ''}
                                onClick={e => { e.preventDefault(); goToQuestion(idx); }}
                                aria-label={`pregunta ${idx + 1}`}
                                aria-current={idx === activeQuestion ? 'true' : undefined}
                            >
                                {idx + 1}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="#" title="Información" aria-label="Información de sección">ℹ️</a>
                    </li>
                </ul>
            </nav>

            {/* Contenedor de la pregunta actual */}
            <article
                className="question-container"
                aria-label={`Pregunta número ${activeQuestion + 1}`}
            >
                <div className="question-number">{activeQuestion + 1}</div>
                <div className="question-content">
                    <p>
                        Al resolver <InlineMath math={questions[activeQuestion].formula} /> se obtiene:
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
                                        className="option-input" />
                                    <label htmlFor={`option-${opt.key}`} className="option-custom-radio">
                                        <span className="marker" />
                                        <div>{opt.text}</div>
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

            {/* Botones de navegación */}
            <footer className="buttons-container">
                <button
                    className="btn btn-primary"
                    onClick={prevQuestion}
                    disabled={activeQuestion === 0}
                >
                    Volver a revisar
                    <span className="btn-icon">◀️</span>
                </button>
                <button
                    className="btn btn-primary"
                    onClick={nextQuestion}
                    disabled={activeQuestion === questions.length - 1}
                >
                    Siguiente
                    <span className="btn-icon">▶️</span>
                </button>
            </footer>
        </div></>
    );
}