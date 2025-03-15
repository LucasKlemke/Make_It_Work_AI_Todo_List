'use server';

import { getAllTasks, getMonthlyGoal, getTasks, updateTask } from '@/db/schema';

export async function getTodayTask(monthlyGoalId: number, currentDate: Date) {
  console.log(currentDate);

  const tasks = await getTasks(monthlyGoalId, currentDate);
  return tasks;
}

export async function getCurrentGoal(userId) {
  const goal = await getMonthlyGoal(userId);
  return goal;
}

export async function updateTaskDay(taskId: number, completedAt: Date) {
  return await updateTask(taskId, completedAt);
}

export async function getTodasTasks(goalId: number) {
  return getAllTasks(goalId);
}
