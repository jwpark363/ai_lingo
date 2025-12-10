import { Train, GraduationCap, ArrowLeft } from 'lucide-react';
import { Scenario, CourseId } from '../../types';
import SubwayBox from './SubwayBox';
import SubwayLegend from './SubwayLegend';
import SubwayHeader from './SubwayHeader';

interface SubwayMapProps {
  scenarios: Scenario[];
  onSelectScenario: (scenario: Scenario) => void;
  course_type: CourseId;
  onBackToCourseSelection: () => void;
}

export function SubwayMap({ scenarios, onSelectScenario, course_type, onBackToCourseSelection }: SubwayMapProps) {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button & Header*/}
        <SubwayHeader course_type={course_type} onBackToCourseSelection={onBackToCourseSelection} />

        {/* Subway Map */}
        <div className="relative bg-white rounded-2xl shadow-xl p-12 overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Lines */}
          <div className="relative space-y-8">
            {scenarios.map((scenario, index) => {
              const completed_stages = scenario.stages.filter((s) => s.status === 'completed').length;
              const total_stages = scenario.stages.length;
              const progress = Math.round((completed_stages / total_stages) * 100);
              return <SubwayBox key={scenario.id} index={index} scenario={scenario} 
                      onSelectScenario={onSelectScenario} total_stages={total_stages} progress={progress} />;
            })}
          </div>

          {/* Legend */}
          <SubwayLegend />
        </div>
      </div>
    </div>
  );
}