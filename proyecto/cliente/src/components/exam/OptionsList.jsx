import { InlineMath } from 'react-katex';

export default function OptionsList({ options, questionIndex, selectedAnswer, onAnswerSelect }) {
    return (
        <ul className="options-list">
            {options.map(opt => (
                <li key={opt.key} className="option-item">
                    <div className="option-container">
                        {opt.key !== 'skip' && (
                            <div className="option-label">{opt.key})</div>
                        )}
                        <div className="option-content">
                            <input
                                type="radio"
                                id={`option-${opt.key}`}
                                name={`question-${questionIndex}`}
                                className="option-input"
                                checked={selectedAnswer === opt.key}
                                onChange={() => onAnswerSelect(questionIndex, opt.key)}
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
    );
}