// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db/index'; // Ajuste o caminho conforme sua estrutura
import { tasksTable } from '@/db/schema'; // Ajuste o caminho conforme sua estrutura

export async function GET(request: Request) {
  try {
    const tasks = await db.select().from(tasksTable);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Erro ao recuperar tasks:', error);
    return NextResponse.json(
      { error: 'Erro ao recuperar tasks' },
      { status: 500 }
    );
  }
}
