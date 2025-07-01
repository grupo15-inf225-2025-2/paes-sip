import { useState, useEffect } from 'react';

export function useExamLogic({ questions, onFinishExam, initialTime }) {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [timerActive, setTimerActive] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Timer effect
    useEffect(() => {
        if (!timerActive || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setTimerActive(false);
                    finishExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);

    const calculateScore = () => {
        let correctAnswers = 0;
        let totalScore = 0;
        
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            if (userAnswer === question.correctAnswer) {
                correctAnswers++;
                totalScore += question.score;
            }
        });
        
        return { correctAnswers, totalScore, totalQuestions: questions.length };
    };

    const finishExam = () => {
        const score = calculateScore();
        onFinishExam(userAnswers, score);
        setTimerActive(false);
    };

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption
        }));
    };

    const handleFinishAttempt = () => {
        setShowConfirmModal(true);
    };

    const confirmFinishExam = () => {
        setShowConfirmModal(false);
        finishExam();
    };

    const cancelFinishExam = () => {
        setShowConfirmModal(false);
    };

    return {
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
        resetTimer: () => setTimeLeft(initialTime)
    };
}