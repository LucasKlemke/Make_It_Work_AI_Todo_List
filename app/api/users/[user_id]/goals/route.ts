// api/%5Buser_id%5D/goals/route.ts
import { NextResponse } from 'next/server';
import { getGoals } from '@/db/schema'; 

export async function GET(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;

  try {
    const goals = await getGoals(user_id);
    return NextResponse.json(goals);
  } catch (error) {
    console.error('Erro ao recuperar goal:', error);
    return NextResponse.json(
      { error: 'Erro ao recuperar goal' },
      { status: 500 }
    );
  }
}
