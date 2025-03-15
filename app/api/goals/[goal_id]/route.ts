// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { getGoal } from '@/db/schema'; // Ajuste o caminho conforme sua estrutura

export async function GET(
  req: Request,
  { params }: { params: Promise<{ goal_id: number }> }
) {
  const { goal_id } = await params;

  try {
    const goal = await getGoal(goal_id);
    return NextResponse.json(goal);
  } catch (error) {
    console.error('Erro ao recuperar goal:', error);
    return NextResponse.json(
      { error: 'Erro ao recuperar goal' },
      { status: 500 }
    );
  }
}
