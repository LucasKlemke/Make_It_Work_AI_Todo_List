import { createMonthlyGoal, createTasks } from '@/db/schema';

export async function POST(req: Request) {
  const { userId, objective, description, methodology, planning } =
    await req.json();

  const today = new Date();

  const newGoalId = await createMonthlyGoal(
    userId,
    objective,
    description,
    methodology
  );

  // transform task into:

  const tasks = planning.flatMap((week, weekIndex) =>
    week.days.flatMap((day, dayIndex) =>
      day.tasks.map((task) => {
        const taskDate = new Date(today);
        taskDate.setDate(today.getDate() + weekIndex * 7 + dayIndex);
        taskDate.setHours(3, 0, 0, 0); // Set hours to 03:00:00.000
        return {
          description: task.name,
          duration: task.duration,
          monthlyGoalId: newGoalId,
          taskDate: taskDate,
        };
      })
    )
  );

  await createTasks(tasks);
}
