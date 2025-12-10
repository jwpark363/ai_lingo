import { motion } from 'motion/react';
import { Code2, GraduationCap } from 'lucide-react';
import { CourseId } from '../../types';
import CourseHeader from './CourseHeader';
import CourseCard from './CourseCard';
import { LearningCourses } from '../../main_data';
// import { text } from 'stream/consumers';

interface CourseSelectionProps {
  onSelectCourse: (course: CourseId) => void;
}

export function CourseSelection({ onSelectCourse }: CourseSelectionProps) {
  const text_colors = ["yellow", "blue"];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <CourseHeader />

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {LearningCourses.map((course,index) => 
            <CourseCard key={index} course={course} text_color={text_colors[index]} onSelectCourse={onSelectCourse} />
          )}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 inline-block">
            <p className="text-slate-600">
              💡 <span className="text-slate-900">학습 팁:</span> 두 언어 모두 초등 4학년부터 쉽게 배울 수 있어요!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
