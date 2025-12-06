import { Train, GraduationCap, ArrowLeft } from 'lucide-react';
import { Scenario, CourseType } from '../types';

interface SubwayMapProps {
  scenarios: Scenario[];
  onSelectScenario: (scenario: Scenario) => void;
  courseType: CourseType;
  onBackToCourseSelection: () => void;
}

export function SubwayMap({ scenarios, onSelectScenario, courseType, onBackToCourseSelection }: SubwayMapProps) {
  const courseTitle = courseType === 'javascript' ? 'JavaScript 학습 노선도' : 'Python 학습 노선도';
  const courseEmoji = courseType === 'javascript' ? '🟨' : '🐍';

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBackToCourseSelection}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>과정 선택으로 돌아가기</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-5xl">{courseEmoji}</div>
            <GraduationCap className="w-12 h-12 text-blue-600" />
            <h1 className="text-slate-900">{courseTitle}</h1>
          </div>
          <p className="text-slate-600">학습하고 싶은 노선을 선택하여 시작하세요</p>
        </div>

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
              const completedStages = scenario.stages.filter((s) => s.status === 'completed').length;
              const totalStages = scenario.stages.length;
              const progress = Math.round((completedStages / totalStages) * 100);

              return (
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
                            <span>{totalStages}개 스테이지</span>
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
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span>완료</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <span>진행중</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-300" />
                <span>잠김</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}