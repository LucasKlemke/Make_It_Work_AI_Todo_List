import { Goals } from '@/db/schema';
import { create } from 'zustand';

export type GoalState = {
  goals: Goals[] | null;
  currentGoal: Goals | null;
  fetchingGoals: boolean;
};

export type GoalActions = {
  setGoals: (goals: Goals[] | null) => void;
  setCurrentGoal: (goal: Goals | null) => void;
  setFetchingGoals: (fetchingState: boolean) => void;
  addGoal: (newGoal: Goals) => void;
  removeGoal: (goalId: string) => Promise<void>;
  updateGoal: (goalId: string, updatedGoal: Partial<Goals>) => Promise<void>;
};

export const useGoalStore = create<GoalState & GoalActions>((set) => ({
  goals: null,
  currentGoal: null,
  fetchingGoals: true,
  setGoals: (goals) => set({ goals }),
  setCurrentGoal: (goal) => set({ currentGoal: goal }),
  setFetchingGoals: (fetchingState) => set({ fetchingGoals: fetchingState }),
  addGoal: (newGoal) => {
    set((state) => ({
      goals: state.goals ? [...state.goals, newGoal] : [newGoal],
    }));
  },
  updateGoal: async (goalId, updatedGoal) => {
    try {
      // Assuming you have this function defined elsewhere
      // await updateGoalDb({ id: goalId, ...updatedGoal });
    } catch (error) {
      throw new Error('Failed to update goal');
    }
    set((state) => ({
      goals: state.goals?.map((g) =>
        g.id === goalId ? { ...g, ...updatedGoal } : g
      ),
    }));
  },
  removeGoal: async (goalId) => {
    set((state) => ({
      goals: state.goals?.filter((g) => g.id !== goalId),
    }));

    try {
      await fetch(`/api/goals/${goalId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error('Erro ao excluir goal');
    }
  },
}));
