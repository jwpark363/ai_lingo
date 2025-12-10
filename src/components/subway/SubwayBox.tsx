import { Train } from "lucide-react";
import { Scenario } from "../../types";

interface SubwayProps{
    index: number;
    scenario: Scenario;
    onSelectScenario: (scenario: Scenario) => void;
    total_stages: number;
    progress: number;
}

export default function SubwayBox({index, scenario, onSelectScenario, total_stages, progress} : SubwayProps){
    return(
    <div
        key={scenario.id}
        className="relative"
        style={{ marginLeft: `${index * 40}px` }}
    >
        {/* Line */}
        <div className="flex items-center gap-4">
        {/* Station Circle */}
        <button
            onClick={() => onSelectScenario(scenario)}
            className="relative group flex items-center gap-4 transition-transform hover:scale-105"
        >
            {/* Circle */}
            <div
            className="w-16 h-16 rounded-full border-4 bg-white shadow-lg flex items-center justify-center transition-all group-hover:shadow-xl"
            style={{ borderColor: scenario.color }}
            >
            <Train className="w-7 h-7" style={{ color: scenario.color }} />
            </div>

            {/* Line extending right */}
            <div className="flex items-center">
            <div
                className="h-2 w-32 rounded-full"
                style={{ backgroundColor: scenario.color }}
            />
            
            {/* Station info box */}
            <div className="ml-4 bg-white border-2 rounded-xl px-6 py-4 shadow-md min-w-[280px] text-left group-hover:shadow-lg transition-shadow"
                    style={{ borderColor: scenario.color }}>
                <div className="flex items-center gap-2 mb-2">
                <div
                    className="px-3 py-1 rounded-full text-white text-sm"
                    style={{ backgroundColor: scenario.color }}
                >
                    {scenario.id}호선
                </div>
                </div>
                <h3 className="text-slate-900 mb-2">{scenario.name}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                <span>{total_stages}개 스테이지</span>
                <span>•</span>
                <span className="text-green-600">{progress}% 완료</span>
                </div>
                
                {/* Progress bar */}
                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className="h-full transition-all duration-500"
                    style={{
                    width: `${progress}%`,
                    backgroundColor: scenario.color,
                    }}
                />
                </div>
            </div>
            </div>
        </button>
        </div>
    </div>        
    )
}