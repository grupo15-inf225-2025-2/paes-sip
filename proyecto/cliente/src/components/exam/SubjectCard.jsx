export default function SubjectCard({ subject, config, questionCount, onStartExam }) {
    return (
        <div className={`subject-card ${config.className}`}>
            <div className="subject-content">
                <div className="subject-icon">{config.icon}</div>
                <h3>{config.title}</h3>
                <p>{config.description}</p>
                <div className="question-count">{questionCount} preguntas</div>
            </div>
            <button 
                className="start-exam-btn"
                onClick={() => onStartExam(subject)}
            >
                Iniciar Ensayo
            </button>
        </div>
    );
}