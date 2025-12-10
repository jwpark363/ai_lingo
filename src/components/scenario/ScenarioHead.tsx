import { ArrowLeft } from "lucide-react";

interface ScenarioHeadProps {
    onBack: () => void;
    scenario_id: string;
    scenario_name: string;
    scenario_color: string;
}
export default function ScenarioHead({onBack, scenario_id, scenario_name, scenario_color}: ScenarioHeadProps){
    return(
    <>
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>노선도로 돌아가기</span>
          </button>

          <div className="flex items-center gap-4">
            <div
              className="px-4 py-2 rounded-full text-white"
              style={{ backgroundColor: scenario_color }}
            >
              {scenario_id}호선
            </div>
            <h1 className="text-slate-900">{scenario_name}</h1>
          </div>
        </div>
    </>
    )
}