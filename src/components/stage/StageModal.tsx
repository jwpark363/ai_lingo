import { X, CheckCircle2, PlayCircle, BookOpen, Award } from 'lucide-react';
import { useState } from 'react';
import { LearningPage } from '../learning/LearningPage';
import { Stage, CourseId } from '../../types';
import StageStats from './StageStats';
import StageGoal from './StageGoal';
import StageHeader from './StageHeader';
import StageAction from './StageAction';

interface StageModalProps {
  stage: Stage;
  scenario_color: string;
  onClose: () => void;
  course_type: CourseId;
}

export function StageModal({ stage, scenario_color, onClose, course_type }: StageModalProps) {
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
        stage_name={stage.name}
        stage_color={scenario_color}
        onClose={() => setShowLearning(false)}
        onComplete={handleCompleteLearning}
        course_type={course_type}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <StageHeader
          stage_status={stage.status}
          stage_name={stage.name}
          scenario_color={scenario_color}
          onClose={onClose}
        />
        {/* Content */}
        <div className="p-8">
          {/* Description & Learning objectives */}
          <StageGoal description={stage.description} goals={stage.goals} />

          {/* Stats */}
          {stage.status === 'completed' && (
            <StageStats study_time={2700} correct_rate={0.86} earned_point={80}/>
          )}

          {/* Actions */}
          <StageAction
            stage_status={stage.status}
            scenario_color={scenario_color}
            onStartLearning={handleStartLearning}
          />
        </div>
      </div>
    </div>
  );
}