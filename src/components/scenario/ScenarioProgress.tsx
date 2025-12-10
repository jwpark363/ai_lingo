interface ProgressProps {
  completed_stage_length: number;
  stage_length: number;
  scenario_color: string;
}

export default function ScenarioProgress({completed_stage_length, stage_length, scenario_color}: ProgressProps) {
return (
    <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
        <span>전체 진행률</span>
        <span>
            {completed_stage_length} /{' '}
            {stage_length} 완료
        </span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
            className="h-full transition-all duration-500"
            style={{
            width: `${completed_stage_length / stage_length * 100 }%`,
            backgroundColor: scenario_color,
            }}
        />
        </div>
    </div>
);
}