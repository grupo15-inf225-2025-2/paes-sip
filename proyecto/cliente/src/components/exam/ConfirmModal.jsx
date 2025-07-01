export default function ConfirmModal({ answeredCount, totalQuestions, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>¿Terminar ensayo?</h3>
                </div>
                <div className="modal-body">
                    <p>¿Estás seguro de que quieres terminar el ensayo?</p>
                    <p>Una vez terminado, no podrás modificar tus respuestas.</p>
                    <div className="answered-summary">
                        <p><strong>Preguntas respondidas:</strong> {answeredCount} de {totalQuestions}</p>
                    </div>
                </div>
                <div className="modal-actions">
                    <button 
                        className="btn btn-secondary" 
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="btn btn-success" 
                        onClick={onConfirm}
                    >
                        Sí, terminar ensayo
                    </button>
                </div>
            </div>
        </div>
    );
}