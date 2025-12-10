import { useState } from 'react';
import { Scenario, Stage, CourseId, StageStatus } from '../../types';
import { ArrowLeft, CheckCircle2, Circle, Lock, MapPin } from 'lucide-react';
import { StageModal } from '../stage/StageModal';
import ScenarioHead from './ScenarioHead';
import ScenarioStation from './ScenarioStation';
import ScenarioProgress from './ScenarioProgress';
import ScenarioInfo from './ScenarioInfo';

interface ScenarioDetailProps {
  scenario: Scenario;
  onBack: () => void;
  course_type: CourseId;
}

export function ScenarioDetail({ scenario, onBack, course_type }: ScenarioDetailProps) {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScenarioHead onBack={onBack} scenario_id={scenario.id} scenario_name={scenario.name} scenario_color={scenario.color} />
        {/* Subway Line Detail */}
        <div className="bg-white rounded-2xl shadow-xl p-12 overflow-x-auto">
          <div className="min-w-max">
            {/* Horizontal subway line */}
            <div className="flex items-start gap-0">
              {scenario.stages.map((stage, index) => (
                <ScenarioStation key={stage.id} index={index} stage={stage}
                  scenario_color={scenario.color} stage_length={scenario.stages.length} setSelectedStage={setSelectedStage} />
              ))}
            </div>
            {/* Progress indicator */}
            <ScenarioProgress completed_stage_length={scenario.stages.filter((s) => s.status === 'completed').length}
                              stage_length={scenario.stages.length} scenario_color={scenario.color} />
          </div>
        </div>
        {/* Info cards */}
        <ScenarioInfo completed_stage_length={scenario.stages.filter((s) => s.status === 'completed').length}
                      current_stage_name={scenario.stages.find((s) => s.status === 'current')?.name}
                      locked_stage_length={scenario.stages.filter((s) => s.status === 'locked').length}
                      scenario_color={scenario.color} />
      </div>
      {/* Stage Modal */}
      {selectedStage && (
        <StageModal
          stage={selectedStage}
          scenario_color={scenario.color}
          onClose={() => setSelectedStage(null)}
          course_type={course_type}
        />
      )}
    </div>
  );
}