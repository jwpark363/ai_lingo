import { useState } from 'react';
import { Scenario, Stage, CourseType } from '../types';
import { ArrowLeft, CheckCircle2, Circle, Lock, MapPin } from 'lucide-react';
import { StageModal } from './StageModal';

interface ScenarioDetailProps {
  scenario: Scenario;
  onBack: () => void;
  courseType: CourseType;
}

export function ScenarioDetail({ scenario, onBack, courseType }: ScenarioDetailProps) {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  const getStageIcon = (status: Stage['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-white" />;
      case 'current':
        return <MapPin className="w-6 h-6 text-white" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-white" />;
    }
  };

  const getStageColor = (status: Stage['status']) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'current':
        return scenario.color;
      case 'locked':
        return '#94A3B8';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
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
              style={{ backgroundColor: scenario.color }}
            >
              {scenario.id}호선
            </div>
            <h1 className="text-slate-900">{scenario.name}</h1>
          </div>
        </div>

        {/* Subway Line Detail */}
        <div className="bg-white rounded-2xl shadow-xl p-12 overflow-x-auto">
          <div className="min-w-max">
            {/* Horizontal subway line */}
            <div className="flex items-start gap-0">
              {scenario.stages.map((stage, index) => (
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
                  {index < scenario.stages.length - 1 && (
                    <div className="flex items-center pt-10">
                      <div
                        className="h-2 w-32 rounded-full transition-all"
                        style={{
                          backgroundColor:
                            stage.status === 'completed' ? scenario.color : '#E2E8F0',
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>전체 진행률</span>
                <span>
                  {scenario.stages.filter((s) => s.status === 'completed').length} /{' '}
                  {scenario.stages.length} 완료
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${
                      (scenario.stages.filter((s) => s.status === 'completed').length /
                        scenario.stages.length) *
                      100
                    }%`,
                    backgroundColor: scenario.color,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h3 className="text-slate-900">완료한 스테이지</h3>
            </div>
            <p className="text-slate-600">
              {scenario.stages.filter((s) => s.status === 'completed').length}개
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-6 h-6" style={{ color: scenario.color }} />
              <h3 className="text-slate-900">진행중</h3>
            </div>
            <p className="text-slate-600">
              {scenario.stages.find((s) => s.status === 'current')?.name || '없음'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-6 h-6 text-slate-400" />
              <h3 className="text-slate-900">남은 스테이지</h3>
            </div>
            <p className="text-slate-600">
              {scenario.stages.filter((s) => s.status === 'locked').length}개
            </p>
          </div>
        </div>
      </div>

      {/* Stage Modal */}
      {selectedStage && (
        <StageModal
          stage={selectedStage}
          scenarioColor={scenario.color}
          onClose={() => setSelectedStage(null)}
          courseType={courseType}
        />
      )}
    </div>
  );
}