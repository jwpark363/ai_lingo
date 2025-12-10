import { CheckCircle2 } from 'lucide-react';

interface StageStatsProps {
    study_time: number;     // 초
    correct_rate: number;   // 소수2자리
    earned_point: number;  // 정수
}
export default function StageStats({study_time, correct_rate, earned_point}: StageStatsProps) {
  return (
    <div className="bg-green-50 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-6 h-6 text-green-600" />
        <h3 className="text-green-900">학습 완료</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
        <div>
            <p className="text-green-600">학습 시간</p>
            <p className="text-green-900">{study_time / 60}분</p>
        </div>
        <div>
            <p className="text-green-600">정답률</p>
            <p className="text-green-900">{correct_rate * 100}%</p>
        </div>
        <div>
            <p className="text-green-600">획득 포인트</p>
            <p className="text-green-900">{earned_point}P</p>
        </div>
        </div>
    </div>
  );
}