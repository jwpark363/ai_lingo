import { useState } from 'react';
import { ArrowRight, Lightbulb, BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { CourseId } from '../../types';
import { PythonLearningContent } from '../content/pythonContent';
import { JavascriptLearningContent } from '../content/javascriptContent';

interface LearningStepProps {
  stage_color: string;
  onComplete: (stars: number) => void;
  onPrevious?: () => void;
  course_type: CourseId;
}

export function LearningStep({ stage_color, onComplete, onPrevious, course_type }: LearningStepProps) {
  const [current_page, setCurrentPage] = useState(0);

  const content = course_type === 'python' ? PythonLearningContent : JavascriptLearningContent;
  const pages = content.pages;
  
  const characterEmoji = course_type === 'python' ? '🐍' : '🤖';
  const characterColor = course_type === 'python' 
    ? 'from-blue-400 to-yellow-400' 
    : 'from-blue-400 to-purple-500';

  const handleNext = () => {
    if (current_page < pages.length - 1) {
      setCurrentPage(current_page + 1);
    } else {
      onComplete(10);
    }
  };

  const handlePrev = () => {
    if (current_page > 0) {
      setCurrentPage(current_page - 1);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const page = pages[current_page];
  console.log(stage_color);
  return (
    <div className="space-y-6">
      {/* Character guide */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-start gap-4"
      >
        <div className={`w-20 h-20 bg-gradient-to-br ${characterColor} rounded-full flex items-center justify-center text-4xl shadow-lg flex-shrink-0`}>
          {characterEmoji}
        </div>
        <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-6 shadow-lg">
          <h3 className="text-slate-900 mb-2">{page.title}</h3>
          <p className="text-slate-600 text-lg leading-relaxed">{page.content}</p>
        </div>
      </motion.div>

      {/* Content card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6" style={{ color: stage_color }} />
          <h3 className="text-slate-900">예제 코드</h3>
        </div>

        {/* Code example */}
        <div className="bg-slate-900 rounded-xl p-6 mb-6">
          <pre className="text-green-400 text-lg">
            <code>{page.example}</code>
          </pre>
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <p className="text-blue-900 text-lg">{page.explanation}</p>
          </div>
        </div>
      </div>

      {/* Page indicator */}
      <div className="flex items-center justify-center gap-2">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === current_page ? 'w-8 bg-blue-500' : 'w-2 bg-slate-300'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>이전</span>
        </button>
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 text-white rounded-xl hover:opacity-90 transition-opacity text-lg"
          style={{ backgroundColor: stage_color }}
        >
          <span>{current_page < pages.length - 1 ? '다음으로' : '완료하기'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}