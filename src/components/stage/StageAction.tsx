import { StageStatus } from "../../types";

interface ActionProps {
  stage_status: StageStatus;
  scenario_color: string;
  onStartLearning: () => void;
}
export default function StageAction({stage_status, scenario_color, onStartLearning}: ActionProps) {
    return (
    <div className="flex gap-3">
        {stage_status === 'completed' ? (
            <>
            <button
                onClick={onStartLearning}
                className="flex-1 px-6 py-3 rounded-xl text-white transition-colors"
                style={{ backgroundColor: scenario_color }}
            >
                다시 학습하기
            </button>
            <button className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                복습 노트 보기
            </button>
            </>
        ) : (
            <>
            <button
                onClick={onStartLearning}
                className="flex-1 px-6 py-3 rounded-xl text-white transition-colors"
                style={{ backgroundColor: scenario_color }}
            >
                학습 시작하기
            </button>
            <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                미리보기
            </button>
            </>
        )}
    </div>
    );
}