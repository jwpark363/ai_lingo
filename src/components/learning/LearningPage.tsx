import { useState } from 'react';
import { X, Star, Trophy, Zap, ArrowRight, ArrowLeft, CheckCircle, Lightbulb } from 'lucide-react';
import { LearningStep } from './LearningStep';
import { QuizStep } from '../QuizStep';
import { CodingStep } from '../CodingStep';
import { motion, AnimatePresence } from 'motion/react';
import { CourseId, LEARNING_STEPS } from '../../types';
import LearningHeader from './LearningHeader';

interface LearningPageProps {
  stage_name: string;
  stage_color: string;
  course_type: CourseId;
  onClose: () => void;
  onComplete: () => void;
}

export function LearningPage({ stage_name, stage_color, course_type, onClose, onComplete }: LearningPageProps) {
  const [current_step_index, setCurrentStepIndex] = useState(0);
  const [steps_state, setStepsState] = useState(LEARNING_STEPS);
  const [total_stars, setTotalStars] = useState(0);
  const [show_congrats, setShowCongrats] = useState(false);

  const current_step = steps_state[current_step_index];
  const progress = ((current_step_index + 1) / steps_state.length) * 100;

  const handleStepComplete = (earnedStars: number) => {
    setTotalStars((prev) => prev + earnedStars);
    
    const new_steps = [...steps_state];
    new_steps[current_step_index].completed = true;
    setStepsState(new_steps);

    if (current_step_index < steps_state.length - 1) {
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
    if (current_step_index > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };
  console.log(current_step_index);
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 z-50 overflow-y-auto">
      {/* Header */}
      <LearningHeader stage_name={stage_name} stage_color={stage_color}
        total_stars={total_stars} current_step_index={current_step_index}
        steps_state={steps_state} progress={progress} onClose={onClose}/>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current_step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {current_step.type === 'learn' && (
              <LearningStep
                stage_color={stage_color}
                onComplete={handleStepComplete}
                onPrevious={current_step_index > 0 ? handlePrevious : undefined}
                course_type={course_type}
              />
            )}
            {current_step.type === 'quiz' && (
              <QuizStep
                stageColor={stage_color}
                onComplete={handleStepComplete}
                onPrevious={handlePrevious}
                courseType={course_type}
              />
            )}
            {current_step.type === 'coding' && (
              <CodingStep
                stageColor={stage_color}
                onComplete={handleStepComplete}
                onPrevious={handlePrevious}
                courseType={course_type}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Congratulations overlay */}
      <AnimatePresence>
        {show_congrats && (
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
                <span className="text-3xl">+{total_stars}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}