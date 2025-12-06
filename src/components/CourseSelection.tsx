import { motion } from 'motion/react';
import { Code2, GraduationCap } from 'lucide-react';
import { CourseType } from '../types';

interface CourseSelectionProps {
  onSelectCourse: (course: CourseType) => void;
}

export function CourseSelection({ onSelectCourse }: CourseSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <GraduationCap className="w-16 h-16 text-blue-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-900 mb-4"
          >
            코딩 학습 플랫폼
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 text-xl"
          >
            배우고 싶은 프로그래밍 언어를 선택하세요
          </motion.p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* JavaScript Course */}
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCourse('javascript')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                <Code2 className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl">🟨</div>
            </div>
            
            <h2 className="text-slate-900 mb-3">JavaScript</h2>
            <p className="text-slate-600 text-lg mb-6">
              웹 개발의 필수 언어! 인터랙티브한 웹사이트를 만들어보세요.
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-green-500">✓</span>
                <span>JavaScript 기초부터 React까지</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-green-500">✓</span>
                <span>웹 API 개발 실습</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-green-500">✓</span>
                <span>4개 노선 24개 스테이지</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-yellow-600 group-hover:gap-4 transition-all">
              <span className="text-lg">학습 시작하기</span>
              <span className="text-2xl">→</span>
            </div>
          </motion.button>

          {/* Python Course */}
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCourse('python')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C10.5 2 9 2.19 7.75 2.5C6.5 2.81 6 3.5 6 4V8C6 8.5 6.5 9.19 7.75 9.5C9 9.81 10.5 10 12 10C13.5 10 15 9.81 16.25 9.5C17.5 9.19 18 8.5 18 8V4C18 3.5 17.5 2.81 16.25 2.5C15 2.19 13.5 2 12 2Z" fill="#FFD43B"/>
                  <path d="M12 14C10.5 14 9 14.19 7.75 14.5C6.5 14.81 6 15.5 6 16V20C6 20.5 6.5 21.19 7.75 21.5C9 21.81 10.5 22 12 22C13.5 22 15 21.81 16.25 21.5C17.5 21.19 18 20.5 18 20V16C18 15.5 17.5 14.81 16.25 14.5C15 14.19 13.5 14 12 14Z" fill="#3776AB"/>
                </svg>
              </div>
              <div className="text-6xl">🐍</div>
            </div>
            
            <h2 className="text-slate-900 mb-3">Python</h2>
            <p className="text-slate-600 text-lg mb-6">
              쉽고 강력한 프로그래밍 언어! AI, 데이터 분석의 기초를 다져보세요.
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-green-500">✓</span>
                <span>Python 기초부터 객체지향까지</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-green-500">✓</span>
                <span>자료구조와 파일 처리</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-green-500">✓</span>
                <span>4개 노선 23개 스테이지</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-600 group-hover:gap-4 transition-all">
              <span className="text-lg">학습 시작하기</span>
              <span className="text-2xl">→</span>
            </div>
          </motion.button>
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
