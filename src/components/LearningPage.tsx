import { useState } from 'react';
import { X, Star, Trophy, Zap, ArrowRight, ArrowLeft, CheckCircle, Lightbulb } from 'lucide-react';
import { LearningStep } from './LearningStep';
import { QuizStep } from './QuizStep';
import { CodingStep } from './CodingStep';
import { motion, AnimatePresence } from 'motion/react';
import { CourseType, LearningType, LEARNING_STEPS } from '../types';

interface LearningPageProps {
  stageName: string;
  stageColor: string;
  onClose: () => void;
  onComplete: () => void;
  courseType: CourseType;
}

export function LearningPage({ stageName, stageColor, onClose, onComplete, courseType }: LearningPageProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepsState, setStepsState] = useState(LEARNING_STEPS);
  const [totalStars, setTotalStars] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  const currentStep = stepsState[currentStepIndex];
  const progress = ((currentStepIndex + 1) / stepsState.length) * 100;

  const handleStepComplete = (earnedStars: number) => {
    setTotalStars((prev) => prev + earnedStars);
    
    const newSteps = [...stepsState];
    newSteps[currentStepIndex].completed = true;
    setStepsState(newSteps);

    if (currentStepIndex < stepsState.length - 1) {
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 500);
    } else {
      setShowCongrats(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-slate-900">{stageName}</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-yellow-700">{totalStars}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-purple-700">{currentStepIndex + 1}/{stepsState.length}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: stageColor }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {stepsState.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all ${
                  index === currentStepIndex
                    ? 'bg-blue-500 text-white scale-110'
                    : step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step.completed && <CheckCircle className="w-4 h-4" />}
                <span>{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep.type === 'learn' && (
              <LearningStep
                stageColor={stageColor}
                onComplete={handleStepComplete}
                onPrevious={currentStepIndex > 0 ? handlePrevious : undefined}
                courseType={courseType}
              />
            )}
            {currentStep.type === 'quiz' && (
              <QuizStep
                stageColor={stageColor}
                onComplete={handleStepComplete}
                onPrevious={handlePrevious}
                courseType={courseType}
              />
            )}
            {currentStep.type === 'coding' && (
              <CodingStep
                stageColor={stageColor}
                onComplete={handleStepComplete}
                onPrevious={handlePrevious}
                courseType={courseType}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Congratulations overlay */}
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl p-12 text-center max-w-md"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-slate-900 mb-3">🎉 축하합니다! 🎉</h2>
              <p className="text-slate-600 mb-6">스테이지를 완료했어요!</p>
              <div className="flex items-center justify-center gap-2 text-yellow-600">
                <Star className="w-8 h-8 fill-yellow-500" />
                <span className="text-3xl">+{totalStars}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}