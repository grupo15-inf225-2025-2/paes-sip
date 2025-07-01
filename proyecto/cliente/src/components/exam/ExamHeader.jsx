import { subjectConfig } from '../../config/subjectConfig';

export default function ExamHeader({ subject, onFinishAttempt, onReset }) {
    const subjectTitle = subjectConfig[subject]?.title || subject;

    return (
        <div className="exam-header">
            <h2>Ensayo de {subjectTitle}</h2>
            <div className="exam-actions">
                <button 
                    className="btn-reset btn-finish" 
                    onClick={onFinishAttempt}
                >
                    Terminar ensayo
                </button>
                <button 
                    className="btn-reset" 
                    onClick={onReset}
                >
                    Cambiar materia
                </button>
            </div>
        </div>
    );
}