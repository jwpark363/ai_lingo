import { useState } from 'react';
import { SubwayMap } from './components/SubwayMap';
import { ScenarioDetail } from './components/ScenarioDetail';
import { CourseSelection } from './components/CourseSelection';
import { CourseType, Scenario } from './types';
import { JavascriptScenarios, PythonScenarios } from './main_data';



export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const currentScenarios = selectedCourse === 'javascript' ? JavascriptScenarios : PythonScenarios;

  if (!selectedCourse) {
    return <CourseSelection onSelectCourse={setSelectedCourse} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!selectedScenario ? (
        <SubwayMap 
          scenarios={currentScenarios} 
          onSelectScenario={setSelectedScenario}
          courseType={selectedCourse}
          onBackToCourseSelection={() => {
            setSelectedCourse(null);
            setSelectedScenario(null);
          }}
        />
      ) : (
        <ScenarioDetail 
          scenario={selectedScenario} 
          onBack={() => setSelectedScenario(null)}
          courseType={selectedCourse}
        />
      )}
    </div>
  );
}