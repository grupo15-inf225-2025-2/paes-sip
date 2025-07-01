export default function NavigationButtons({ 
    activeQuestion, 
    totalQuestions, 
    onPrevious, 
    onNext, 
    onFinish 
}) {
    const isFirstQuestion = activeQuestion === 0;
    const isLastQuestion = activeQuestion === totalQuestions - 1;

    return (
        <footer className="buttons-container">
            <button
                className="btn btn-primary"
                onClick={onPrevious}
                disabled={isFirstQuestion}
            >
                Pregunta anterior
                <span className="btn-icon"></span>
            </button>
            
            {/* Botón condicional: "Siguiente pregunta" o "Terminar ensayo" */}
            {isLastQuestion ? (
                <button
                    className="btn btn-finish"
                    onClick={onFinish}
                >
                    Terminar ensayo
                    <span className="btn-icon"></span>
                </button>
            ) : (
                <button
                    className="btn btn-primary"
                    onClick={onNext}
                >
                    Siguiente pregunta
                    <span className="btn-icon"></span>
                </button>
            )}
        </footer>
    );
}