import { CheckCircle2, PlayCircle, X } from "lucide-react";
import { StageStatus } from "../../types";

interface StageHeaderProps {
    stage_status: StageStatus;
    stage_name: string;
    scenario_color: string;
    onClose: () => void;
}

export default function StageHeader({stage_status, stage_name, scenario_color, onClose}: StageHeaderProps) {
  return (
    <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
        <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: scenario_color }}
        >
            {stage_status === 'completed' ? (
            <CheckCircle2 className="w-6 h-6 text-white" />
            ) : (
            <PlayCircle className="w-6 h-6 text-white" />
            )}
        </div>
        <div>
            <div
            className="inline-block px-3 py-1 rounded-full text-white text-sm mb-1"
            style={{ backgroundColor: scenario_color }}
            >
            {stage_status === 'completed' ? '완료' : '진행중'}
            </div>
            <h2 className="text-slate-900">{stage_name}</h2>
        </div>
        </div>
        <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors"
        >
        <X className="w-6 h-6" />
        </button>
    </div>
  );
}