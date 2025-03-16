import { createGoal, createTasks } from '@/db/schema';
import { NextResponse } from 'next/server';



// Criar um novo goal
export async function POST(req: Request) {
  try {
    const {
      userId,
      objective,
      description,
      methodology,
      planning,
    }: {
      userId: string;
      objective: string;
      description: string;
      methodology: string;
      planning: {
        week: number;
        days: {
          day: number;
          tasks: {
            name: string;
            duration: number | null;
          }[];
        }[];
      }[];
    } = await req.json();

    const today = new Date();

    const newGoalId = await createGoal(
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
            duration: task.duration ?? 0,
            monthlyGoalId: newGoalId,
            taskDate: taskDate,
          };
        })
      )
    );

    await createTasks(tasks);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao criar goal:', error);
    return NextResponse.json({ error: 'Erro ao criar goal' }, { status: 500 });
  }
}
