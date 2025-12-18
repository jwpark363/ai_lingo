import { create } from 'zustand';
import { StageStatus } from './types';

export interface Progress{
    course_id: string;
    scenario_id: string;
    stage_id: string;
    status: StageStatus;
}

interface UserProgressState {
  completedProgress: Progress[];
  addProgress: (progress: Progress) => void;
  deleteProgress: (progress: Progress) => void;
  updateProgress: (progress: Progress) => void;
}

export const useUserProgressStore = create<UserProgressState>((set) => ({
  completedProgress: [],
  addProgress: (progress: Progress) =>
    set((state) => ({
      completedProgress: [...state.completedProgress, progress],
    })),
    deleteProgress: (progress: Progress) =>
        set((state) => ({
            completedProgress: state.completedProgress.filter(
                (p => !(p.scenario_id === progress.scenario_id && p.stage_id === progress.stage_id && p.course_id === progress.course_id)),
            )})),
    updateProgress: (progress: Progress) =>
        set((state) => ({
            completedProgress: state.completedProgress.map((p) =>
                p.scenario_id === progress.scenario_id && p.stage_id === progress.stage_id && p.course_id === progress.course_id
                    ? progress
                    : p,
            ),
        })),

}));

export interface UserProgressActions {
  addProgress: (progress: Progress) => void;
  deleteProgress: (progress: Progress) => void;
  updateProgress: (progress: Progress) => void;
}