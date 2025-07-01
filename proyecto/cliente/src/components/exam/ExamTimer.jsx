import { Timer } from 'lucide-react';

export default function ExamTimer({ timeLeft, timerActive }) {
    const formatTime = seconds => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <section className="timer" aria-label="Temporizador">
            <span className="timer-icon">
                <Timer />
            </span>
            <div className={`timer-display ${timeLeft < 60 ? 'timer-warning' : ''}`}>
                {formatTime(timeLeft)}
            </div>
            {!timerActive && timeLeft === 0 && (
                <div className="timer-expired">¡Tiempo agotado!</div>
            )}
        </section>
    );
}