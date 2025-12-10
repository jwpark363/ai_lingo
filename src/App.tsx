import { useState } from 'react';
import { SubwayMap } from './components/subway/SubwayMap';
import { ScenarioDetail } from './components/scenario/ScenarioDetail';
import { CourseSelection } from './components/course/CourseSelection';
import { CourseId, Scenario } from './types';
import { JavascriptScenarios, PythonScenarios } from './main_data';

export default function App() {
  const [selected_course, setSelectedCourse] = useState<CourseId | null>(null);
  const [selected_scenario, setSelectedScenario] = useState<Scenario | null>(null);
  const current_scenarios = selected_course === 'javascript' ? JavascriptScenarios : PythonScenarios;

  if (!selected_course) {
    return <CourseSelection onSelectCourse={setSelectedCourse} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!selected_scenario ? (
        <SubwayMap 
          scenarios={current_scenarios} 
          onSelectScenario={setSelectedScenario}
          course_type={selected_course}
          onBackToCourseSelection={() => {
            setSelectedCourse(null);
            setSelectedScenario(null);
          }}
        />
      ) : (
        <ScenarioDetail 
          scenario={selected_scenario} 
          onBack={() => setSelectedScenario(null)}
          course_type={selected_course}
        />
      )}
    </div>
  );
}