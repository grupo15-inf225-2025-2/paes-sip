import { subjectConfig } from '../../config/subjectConfig';
import SubjectCard   from './SubjectCard';
import ExamInfo       from './ExamInfo';

export default function SubjectSelection({ questionBanks, onStartExam }) {
    return (
        <div className="subject-selection">
            <h2>Selecciona el tipo de ensayo</h2>
            <div className="subject-cards">
                {Object.entries(subjectConfig).map(([key, config]) => (
                    <SubjectCard
                        key={key}
                        subject={key}
                        config={config}
                        questionCount={questionBanks[key]?.length || 0}
                        onStartExam={onStartExam}
                    />
                ))}
            </div>
            <ExamInfo />
        </div>
    );
}