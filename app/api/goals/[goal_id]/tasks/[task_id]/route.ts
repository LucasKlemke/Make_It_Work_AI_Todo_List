// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { getTask, getTasks1 } from '@/db/schema'; // Ajuste o caminho conforme sua estrutura

export async function GET(
  req: Request,
  { params }: { params: Promise<{ goal_id: number; task_id: number }> }
) {
  const { task_id, goal_id } = await params;

  try {
    const task = await getTask(task_id, goal_id);
    return NextResponse.json(task);
  } catch (error) {
    console.error('Erro ao recuperar task:', error);
    return NextResponse.json(
      { error: 'Erro ao recuperar task' },
      { status: 500 }
    );
  }
}
