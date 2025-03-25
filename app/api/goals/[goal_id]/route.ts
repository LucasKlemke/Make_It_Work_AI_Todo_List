// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { deletePlan, getGoal } from '@/db/schema'; // Ajuste o caminho conforme sua estrutura

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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ goal_id: number }> }
) {
  const { goal_id } = await params;

  try {
    const deleted_goal = await deletePlan(goal_id);
    return NextResponse.json(goal_id);
  } catch (error) {
    console.error('Erro ao excluir goal:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir goal' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
