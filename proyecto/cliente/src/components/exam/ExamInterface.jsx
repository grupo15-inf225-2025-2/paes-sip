import { useState, useEffect } from 'react';
import ExamHeader from './ExamHeader';
import ExamTimer from './ExamTimer';
import ProgressBar from './ProgressBar';
import QuestionNavigation from './QuestionNavigation';
import QuestionCard from './QuestionCard';
import NavigationButtons from './NavigationButtons';
import ConfirmModal from './ConfirmModal';
import { useExamLogic } from '../../hooks/useExamLogic';

export default function ExamInterface({ subject, questions, onFinishExam, onReset }) {
    const {
        activeQuestion,
        userAnswers,
        timeLeft,
        timerActive,
        showConfirmModal,
        setActiveQuestion,
        handleAnswerSelect,
        handleFinishAttempt,
        confirmFinishExam,
        cancelFinishExam,
        resetTimer
    } = useExamLogic({
        questions,
        onFinishExam,
        initialTime: 15 * 60
    });

    const progress = questions.length > 0 ? ((activeQuestion + 1) / questions.length) * 100 : 0;

    return (
        <>
            <ExamHeader
                subject={subject}
                onFinishAttempt={handleFinishAttempt}
                onReset={onReset}
            />

            <ExamTimer
                timeLeft={timeLeft}
                timerActive={timerActive}
            />

            <ProgressBar
                progress={progress}
                current={activeQuestion + 1}
                total={questions.length}
            />

            <QuestionNavigation
                questions={questions}
                activeQuestion={activeQuestion}
                userAnswers={userAnswers}
                onQuestionSelect={setActiveQuestion}
            />

            {questions.length > 0 && (
                <QuestionCard
                    question={questions[activeQuestion]}
                    questionIndex={activeQuestion}
                    userAnswer={userAnswers[activeQuestion]}
                    onAnswerSelect={handleAnswerSelect}
                />
            )}

            <NavigationButtons
                activeQuestion={activeQuestion}
                totalQuestions={questions.length}
                onPrevious={() => setActiveQuestion(activeQuestion - 1)}
                onNext={() => setActiveQuestion(activeQuestion + 1)}
                onFinish={handleFinishAttempt}
            />

            {showConfirmModal && (
                <ConfirmModal
                    answeredCount={Object.keys(userAnswers).length}
                    totalQuestions={questions.length}
                    onConfirm={confirmFinishExam}
                    onCancel={cancelFinishExam}
                />
            )}
        </>
    );
}
