import { InlineMath } from 'react-katex';
import { subjectConfig } from '../../config/subjectConfig';

export default function ExamResults({ subject, questions, userAnswers, score, onReset }) {
    const { correctAnswers, totalScore, totalQuestions } = score;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const subjectTitle = subjectConfig[subject]?.title || subject;

    return (
        <div className="results-container">
            <h2>Resultados del Ensayo de {subjectTitle}</h2>
            
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
                <button className="btn btn-primary" onClick={onReset}>
                    Realizar otro ensayo
                </button>
            </div>
        </div>
    );
}