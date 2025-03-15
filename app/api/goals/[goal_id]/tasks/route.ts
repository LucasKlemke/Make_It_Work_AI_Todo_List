// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { getTasks1 } from '@/db/schema'; // Ajuste o caminho conforme sua estrutura

export async function GET(
  req: Request,
  { params }: { params: Promise<{ goal_id: number }> }
) {
  const { goal_id } = await params;

  try {
    const tasks = await getTasks1(goal_id);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Erro ao recuperar tasks:', error);
    return NextResponse.json(
      { error: 'Erro ao recuperar tasks' },
      { status: 500 }
    );
  }
}
