import { BookOpen, Award } from 'lucide-react';

interface StageGoalProps {
    description: string;
    goals: string[];
}

export default function StageGoal({ description, goals }: StageGoalProps) {
    return (
    <>
    {/* Description */}
    <div className="mb-8">
    <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-slate-600" />
        <h3 className="text-slate-900">학습 내용</h3>
    </div>
    <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>

    {/* Learning objectives */}
    <div className="mb-8">
    <div className="flex items-center gap-2 mb-3">
        <Award className="w-5 h-5 text-slate-600" />
        <h3 className="text-slate-900">학습 목표</h3>
    </div>
    <ul className="space-y-2">
        {goals.map((goal, index) => (
        <li key={index} className="flex items-start gap-2 text-slate-600">
            <span className="text-green-500 mt-1">✓</span>
            <span>{goal}</span>
        </li>
        ))}
        {/* <li className="flex items-start gap-2 text-slate-600">
        <span className="text-green-500 mt-1">✓</span>
        <span>핵심 개념을 이해하고 설명할 수 있습니다</span>
        </li>
        <li className="flex items-start gap-2 text-slate-600">
        <span className="text-green-500 mt-1">✓</span>
        <span>실습 예제를 통해 직접 코드를 작성할 수 있습니다</span>
        </li>
        <li className="flex items-start gap-2 text-slate-600">
        <span className="text-green-500 mt-1">✓</span>
        <span>퀴즈를 통해 학습 내용을 점검할 수 있습니다</span>
        </li> */}
    </ul>
    </div>
    </>
    );
}