export default function QuestionNavigation({ questions, activeQuestion, userAnswers, onQuestionSelect }) {
    return (
        <nav className="questions-nav" aria-label="Navegación de preguntas">
            <ul>
                {questions.map((_, idx) => (
                    <li key={idx}>
                        <a
                            href="#"
                            className={`${idx === activeQuestion ? 'active' : ''} ${userAnswers[idx] ? 'answered' : ''}`}
                            onClick={e => { 
                                e.preventDefault(); 
                                onQuestionSelect(idx); 
                            }}
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
    );
}