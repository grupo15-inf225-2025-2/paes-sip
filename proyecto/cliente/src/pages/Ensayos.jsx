import { useState } from 'react';
import Header from "../components/Header";
import SubjectSelection from "../components/exam/SubjectSelection";
import ExamInterface from "../components/exam/ExamInterface";
import ExamResults from "../components/exam/ExamResults";
import { questionBanks } from "../data/questionBanks";

import '../assets/css/Ensayo.css';

export default function Ensayos() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [examStarted, setExamStarted] = useState(false);
    const [examFinished, setExamFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [examScore, setExamScore] = useState(null);

    console.log(
        '%c[Ensayos] selectedSubject →', 
        'color: teal; font-weight: bold;', 
        selectedSubject, 
        questionBanks[selectedSubject]
    );

    const handleStartExam = (subject) => {
        setSelectedSubject(subject);
        setExamStarted(true);
        setExamFinished(false);
        setUserAnswers({});
        setExamScore(null);
    };

    const handleExamFinish = (answers, score) => {
        setUserAnswers(answers);
        setExamScore(score);
        setExamFinished(true);
    };

    const handleReset = () => {
        setSelectedSubject(null);
        setExamStarted(false);
        setExamFinished(false);
        setUserAnswers({});
        setExamScore(null);
    };

    return (
        <>
            <div className="container">
                {!examStarted && (
                    <SubjectSelection 
                        questionBanks={questionBanks}
                        onStartExam={handleStartExam}
                    />
                )}
                
                {examStarted && !examFinished && (
                    <ExamInterface
                        subject={selectedSubject}
                        questions={questionBanks[selectedSubject]}
                        onFinishExam={handleExamFinish}
                        onReset={handleReset}
                    />
                )}
                
                {examFinished && (
                    <ExamResults
                        subject={selectedSubject}
                        questions={questionBanks[selectedSubject]}
                        userAnswers={userAnswers}
                        score={examScore}
                        onReset={handleReset}
                    />
                )}
            </div>
        </>
    );
}