import { CheckCircle2, Lock, MapPin } from "lucide-react";

interface ScenarioInfoProps {
  completed_stage_length: number;
  current_stage_name: string | undefined;
  locked_stage_length: number;
  scenario_color: string;
}

export default function ScenarioInfo({
    completed_stage_length, current_stage_name, locked_stage_length, scenario_color
}: ScenarioInfoProps) {
    return(
    <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h3 className="text-slate-900">완료한 스테이지</h3>
        </div>
        <p className="text-slate-600">
            {completed_stage_length}개
        </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-6 h-6" style={{ color: scenario_color }} />
            <h3 className="text-slate-900">진행중</h3>
        </div>
        <p className="text-slate-600">
            {current_stage_name || '없음'}
        </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-2">
            <Lock className="w-6 h-6 text-slate-400" />
            <h3 className="text-slate-900">남은 스테이지</h3>
        </div>
        <p className="text-slate-600">
            {locked_stage_length}개
        </p>
        </div>
    </div>
    );
}