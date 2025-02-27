'use server'
import { db } from '@/db/index'; // Importe sua instância do Drizzle
import { usersTable, monthlyGoalsTable, tasksTable } from '@/db/schema';

export async function seedDatabase() {
  // 1. Inserir múltiplos usuários
  const insertedUsers = await db
    .insert(usersTable)
    .values([
      {
        name: 'João Silva',
        age: 30,
        email: 'joao.silva@example.com',
        isVerified: true,
      },
      {
        name: 'Maria Oliveira',
        age: 25,
        email: 'maria.oliveira@example.com',
        isVerified: false,
      },
    ])
    .returning();

  // Captura dos IDs dos usuários
  const joao = insertedUsers.find(
    (user) => user.email === 'joao.silva@example.com'
  );
  const maria = insertedUsers.find(
    (user) => user.email === 'maria.oliveira@example.com'
  );

  // 2. Inserir metas mensais para cada usuário
  const insertedGoals = await db
    .insert(monthlyGoalsTable)
    .values([
      {
        userId: joao!.id,
        goal: 'Aprender a utilizar o Drizzle ORM e desenvolver uma to-do list com IA',
        month: new Date(2025, 1, 1), // 1º de Fevereiro de 2025 (lembre que o mês é zero-indexado)
      },
      {
        userId: maria!.id,
        goal: 'Melhorar a organização pessoal e produtividade no trabalho',
        month: new Date(2025, 1, 1),
      },
    ])
    .returning();

  // Captura dos IDs das metas mensais
  const joaoGoal = insertedGoals.find((goal) => goal.userId === joao!.id);
  const mariaGoal = insertedGoals.find((goal) => goal.userId === maria!.id);

  // 3. Inserir tasks associadas à meta mensal de cada usuário

  // Tasks para o João
  const joaoTasksData = [
    {
      monthlyGoalId: joaoGoal!.id,
      taskDate: new Date(2025, 1, 1, 9, 0, 0),
      description: 'Ler documentação do Drizzle ORM',
      isDone: true,
      duration: 60, // duração em minutos
      completedAt: new Date(2025, 1, 1, 10, 0, 0),
    },
    {
      monthlyGoalId: joaoGoal!.id,
      taskDate: new Date(2025, 1, 1, 12, 0, 0),
      description: 'Configurar ambiente de desenvolvimento',
      isDone: true,
      duration: 90,
      completedAt: new Date(2025, 1, 1, 13, 30, 0),
    },
    {
      monthlyGoalId: joaoGoal!.id,
      taskDate: new Date(2025, 1, 2, 9, 0, 0),
      description: 'Implementar modelo de dados',
      isDone: false,
      duration: 120,
      completedAt: null,
    },
    {
      monthlyGoalId: joaoGoal!.id,
      taskDate: new Date(2025, 1, 2, 15, 0, 0),
      description: 'Testar inserção de dados',
      isDone: false,
      duration: 45,
      completedAt: null,
    },
  ];

  // Tasks para a Maria
  const mariaTasksData = [
    {
      monthlyGoalId: mariaGoal!.id,
      taskDate: new Date(2025, 1, 1, 8, 0, 0),
      description: 'Organizar agenda semanal',
      isDone: true,
      duration: 30,
      completedAt: new Date(2025, 1, 1, 8, 30, 0),
    },
    {
      monthlyGoalId: mariaGoal!.id,
      taskDate: new Date(2025, 1, 1, 10, 0, 0),
      description: 'Planejar metas diárias',
      isDone: true,
      duration: 20,
      completedAt: new Date(2025, 1, 1, 10, 20, 0),
    },
    {
      monthlyGoalId: mariaGoal!.id,
      taskDate: new Date(2025, 1, 2, 14, 0, 0),
      description: 'Revisar tarefas pendentes',
      isDone: false,
      duration: 40,
      completedAt: null,
    },
    {
      monthlyGoalId: mariaGoal!.id,
      taskDate: new Date(2025, 1, 2, 16, 0, 0),
      description: 'Atualizar status do projeto',
      isDone: false,
      duration: 50,
      completedAt: null,
    },
  ];

  // Inserção dos dados das tasks
  const insertedJoaoTasks = await db
    .insert(tasksTable)
    .values(joaoTasksData)
    .returning();
  const insertedMariaTasks = await db
    .insert(tasksTable)
    .values(mariaTasksData)
    .returning();

  console.log('Seed concluído com os seguintes dados:');
  console.log('Usuários:', insertedUsers);
  console.log('Metas mensais:', insertedGoals);
  console.log('Tasks do João:', insertedJoaoTasks);
  console.log('Tasks da Maria:', insertedMariaTasks);
}


