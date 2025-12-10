import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function CourseHeader() {
    return(
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
    );
}