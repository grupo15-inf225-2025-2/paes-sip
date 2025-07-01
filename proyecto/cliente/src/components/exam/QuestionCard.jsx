import { InlineMath } from 'react-katex';
import OptionsList from './OptionsList';

export default function QuestionCard({ question, questionIndex, userAnswer, onAnswerSelect }) {
    return (
        <article className="question-container" aria-label={`Pregunta número ${questionIndex + 1}`}>
            <div className="question-number">{questionIndex + 1}</div>
            <div className="question-content">
                <p>
                    {question.question && question.question}
                    {question.formula && !question.question && (
                        <>Al resolver <InlineMath math={question.formula} /> se obtiene:</>
                    )}
                    {question.formula && question.question && (
                        <><br/><InlineMath math={question.formula} /></>
                    )}
                </p>
            </div>

            <OptionsList
                options={question.options}
                questionIndex={questionIndex}
                selectedAnswer={userAnswer}
                onAnswerSelect={onAnswerSelect}
            />

            <div className="points-display">
                <p>Puntaje: {question.score} pts</p>
            </div>
        </article>
    );
}