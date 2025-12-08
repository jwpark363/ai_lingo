export interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'locked';
  description: string;
  goals: string[];
}

export interface Scenario {
  id: string;
  name: string;
  color: string;
  stages: Stage[];
}

export type CourseType = 'javascript' | 'python';

export type LearningType = 'learn' | 'quiz' | 'coding';

export interface LearningStep {
  id: string;
  type: LearningType;
  title: string;
  completed: boolean;
}

export const LEARNING_STEPS: LearningStep[] = [
  { id: '1', type: 'learn', title: '개념 이해하기', completed: false },
  { id: '2', type: 'quiz', title: '퀴즈 풀기', completed: false },
  { id: '3', type: 'coding', title: '코드 작성하기', completed: false },
];
