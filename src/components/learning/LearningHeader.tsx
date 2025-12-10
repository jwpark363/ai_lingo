import { X, Star, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { LearningStep } from '../../types';

interface LearningHeaderProps {
  stage_name: string;
  stage_color: string;
  total_stars: number;
  current_step_index: number;
  steps_state: LearningStep[];
  progress: number;
  onClose: () => void;
}
export default function LearningHeader({
    stage_name,stage_color,total_stars,current_step_index,steps_state,progress,onClose
}: LearningHeaderProps) {
    return (
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
              <h2 className="text-slate-900">{stage_name}</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-yellow-700">{total_stars}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-purple-700">{current_step_index + 1}/{steps_state.length}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: stage_color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {steps_state.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all ${
                  index === current_step_index
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
    );
}