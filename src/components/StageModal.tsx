import { X, CheckCircle2, PlayCircle, BookOpen, Award } from 'lucide-react';
import { useState } from 'react';
import { LearningPage } from './LearningPage';
import { Stage, CourseType } from '../types';
import StageStats from './StageStats';
import StageGoal from './StageGoal';

interface StageModalProps {
  stage: Stage;
  scenarioColor: string;
  onClose: () => void;
  courseType: CourseType;
}

export function StageModal({ stage, scenarioColor, onClose, courseType }: StageModalProps) {
  const [showLearning, setShowLearning] = useState(false);

  const handleStartLearning = () => {
    setShowLearning(true);
  };

  const handleCompleteLearning = () => {
    setShowLearning(false);
    onClose();
  };

  if (showLearning) {
    return (
      <LearningPage
        stageName={stage.name}
        stageColor={scenarioColor}
        onClose={() => setShowLearning(false)}
        onComplete={handleCompleteLearning}
        courseType={courseType}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: scenarioColor }}
            >
              {stage.status === 'completed' ? (
                <CheckCircle2 className="w-6 h-6 text-white" />
              ) : (
                <PlayCircle className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <div
                className="inline-block px-3 py-1 rounded-full text-white text-sm mb-1"
                style={{ backgroundColor: scenarioColor }}
              >
                {stage.status === 'completed' ? '완료' : '진행중'}
              </div>
              <h2 className="text-slate-900">{stage.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Description & Learning objectives */}
          <StageGoal description={stage.description} goals={stage.goals} />

          {/* Stats */}
          {stage.status === 'completed' && (
            <StageStats study_time={2700} correct_rate={0.86} earned_point={80}/>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {stage.status === 'completed' ? (
              <>
                <button
                  onClick={handleStartLearning}
                  className="flex-1 px-6 py-3 rounded-xl text-white transition-colors"
                  style={{ backgroundColor: scenarioColor }}
                >
                  다시 학습하기
                </button>
                <button className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                  복습 노트 보기
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleStartLearning}
                  className="flex-1 px-6 py-3 rounded-xl text-white transition-colors"
                  style={{ backgroundColor: scenarioColor }}
                >
                  학습 시작하기
                </button>
                <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                  미리보기
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}