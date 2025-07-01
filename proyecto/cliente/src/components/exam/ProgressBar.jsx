export default function ProgressBar({ progress, current, total }) {
    return (
        <div className="progress-container" aria-label="Barra de progreso">
            <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }} 
            />
            <div className="progress-text">
                Pregunta {current} de {total}
            </div>
        </div>
    );
}