export interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'locked';
  description: string;
}

export interface Scenario {
  id: string;
  name: string;
  color: string;
  stages: Stage[];
}

export type CourseType = 'javascript' | 'python';