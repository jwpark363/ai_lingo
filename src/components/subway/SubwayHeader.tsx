import { ArrowLeft, GraduationCap } from "lucide-react";
import { CourseId } from "../../types";

interface SubwayHeaderProps {
    course_type: CourseId;
    onBackToCourseSelection: () => void;
}

export default function SubwayHeader({course_type, onBackToCourseSelection}: SubwayHeaderProps) {
  const course_title = course_type === 'javascript' ? 'JavaScript 학습 노선도' : 'Python 학습 노선도';
  const course_emoji = course_type === 'javascript' ? '🟨' : '🐍';

    return(
    <>
        {/* Back button */}
        <button
          onClick={onBackToCourseSelection}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>과정 선택으로 돌아가기</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-5xl">{course_emoji}</div>
            <GraduationCap className="w-12 h-12 text-blue-600" />
            <h1 className="text-slate-900">{course_title}</h1>
          </div>
          <p className="text-slate-600">학습하고 싶은 노선을 선택하여 시작하세요</p>
        </div>
    </>
    )
}