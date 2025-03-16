'use server';

import { updateTask } from '@/db/schema';



export async function updateTaskDay(taskId: number, completedAt: Date) {
  return await updateTask(taskId, completedAt);
}
