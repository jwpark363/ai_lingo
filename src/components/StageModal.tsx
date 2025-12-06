import { X, CheckCircle2, PlayCircle, BookOpen, Award } from 'lucide-react';
import { useState } from 'react';
import { LearningPage } from './LearningPage';
import { Stage, CourseType } from '../types';

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
          {/* Description */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">학습 내용</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">{stage.description}</p>
          </div>

          {/* Learning objectives */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">학습 목표</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-slate-600">
                <span className="text-green-500 mt-1">✓</span>
                <span>핵심 개념을 이해하고 설명할 수 있습니다</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <span className="text-green-500 mt-1">✓</span>
                <span>실습 예제를 통해 직접 코드를 작성할 수 있습니다</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <span className="text-green-500 mt-1">✓</span>
                <span>퀴즈를 통해 학습 내용을 점검할 수 있습니다</span>
              </li>
            </ul>
          </div>

          {/* Stats */}
          {stage.status === 'completed' && (
            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h3 className="text-green-900">학습 완료</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-green-600">학습 시간</p>
                  <p className="text-green-900">45분</p>
                </div>
                <div>
                  <p className="text-green-600">정답률</p>
                  <p className="text-green-900">90%</p>
                </div>
                <div>
                  <p className="text-green-600">획득 포인트</p>
                  <p className="text-green-900">100P</p>
                </div>
              </div>
            </div>
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