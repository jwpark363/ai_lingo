import { motion } from 'motion/react';
import { Course, CourseId } from "../../types";
import { Code2, Brain, FileTerminal } from 'lucide-react';

interface CourseCardProps {
    course: Course;
    text_color: string;
    onSelectCourse: (course_id: CourseId) => void;
}
export default function CourseCard({course, text_color, onSelectCourse}: CourseCardProps) {
    const icons = (id:CourseId) => id==='javascript'?<Code2 className="w-10 h-10 text-white" />:
                                    id==='python'?<Brain className="w-10 h-10 text-blue" />:
                                    <FileTerminal className="w-10 h-10 text-white" />;
    return(
    <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectCourse(course.id)}
        className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all text-left group"
    >
        <div className="flex items-center justify-between mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            {icons(course.id)}
            </div>
            <div className="text-6xl">{course.icon}</div>
        </div>
        
        <h2 className="text-slate-900 mb-3">JavaScript</h2>
        <p className="text-slate-600 text-lg mb-6">
            {course.description}
        </p>
        
        <div className="space-y-2 mb-6">
            {course.goals.map((goal, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span>
                    <span>{goal}</span>
                </div>
            ))}
        </div>

        <div className={`flex items-center gap-2 text-${text_color}-600 group-hover:gap-4 transition-all`}>
            <span className="text-lg">학습 시작하기</span>
            <span className="text-2xl">→</span>
        </div>
    </motion.button>
    );
}