import { CheckCircle2, Lock, MapPin } from "lucide-react";
import { Stage, StageStatus } from "../../types";

interface ScenarioStationProps {
    index: number;
    stage: Stage;
    scenario_color: string;
    stage_length: number;
    setSelectedStage: (stage: Stage | null) => void;
}

export default function ScenarioStation({index, stage, scenario_color, stage_length, setSelectedStage}: ScenarioStationProps
){
  const getStageIcon = (status: StageStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-white" />;
      case 'current':
        return <MapPin className="w-6 h-6 text-white" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-white" />;
    }
  };

  const getStageColor = (status: StageStatus) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'current':
        return scenario_color;
      case 'locked':
        return '#94A3B8';
    }
  };

    return(
        <div key={stage.id} className="flex items-start">
            {/* Station */}
            <div className="flex flex-col items-center">
            {/* Station circle */}
            <button
                onClick={() => stage.status !== 'locked' && setSelectedStage(stage)}
                disabled={stage.status === 'locked'}
                className="relative group flex flex-col items-center transition-transform hover:scale-110 disabled:hover:scale-100"
            >
                <div
                className="w-20 h-20 rounded-full border-4 bg-white shadow-lg flex items-center justify-center transition-all group-hover:shadow-xl disabled:opacity-60"
                style={{ borderColor: getStageColor(stage.status) }}
                >
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getStageColor(stage.status) }}
                >
                    {getStageIcon(stage.status)}
                </div>
                </div>

                {/* Station name */}
                <div className="mt-4 text-center max-w-[160px]">
                <div
                    className="px-3 py-1 rounded-full text-white text-sm mb-2 inline-block"
                    style={{ backgroundColor: getStageColor(stage.status) }}
                >
                    Stage {index + 1}
                </div>
                <p className="text-slate-900">{stage.name}</p>
                </div>
            </button>
            </div>

            {/* Connecting line */}
            {index < stage_length- 1 && (
            <div className="flex items-center pt-10">
                <div
                className="h-2 w-32 rounded-full transition-all"
                style={{
                    backgroundColor:
                    stage.status === 'completed' ? scenario_color : '#E2E8F0',
                }}
                />
            </div>
            )}
        </div>        
    )
}