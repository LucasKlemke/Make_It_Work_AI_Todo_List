'use server';

import { getMonthlyGoal, getTasks } from '@/db/schema';

export async function getTodayTask(monthlyGoalId: number, currentDate: Date) {
  console.log(currentDate);

  const tasks = await getTasks(monthlyGoalId, currentDate);
  return tasks;
}

export async function getCurrentGoal(userId) {
  const goal = await getMonthlyGoal(userId);
  return goal;
}
