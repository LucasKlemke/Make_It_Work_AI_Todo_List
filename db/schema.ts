import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

// Tabela de usuários com informações de verificação e data de cadastro
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
  isVerified: boolean('is_verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Tabela para a meta mensal definida pelo usuário
export const monthlyGoalsTable = pgTable('monthly_goals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  goal: text('goal').notNull(), // Objetivo mensal do usuário
  month: timestamp('month').notNull(), // Data representando o mês (por exemplo, 1º dia do mês)
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Tabela para as tasks, cada uma relacionada a uma meta mensal
export const tasksTable = pgTable('tasks', {
  id: serial('id').primaryKey(),
  monthlyGoalId: integer('monthly_goal_id')
    .notNull()
    .references(() => monthlyGoalsTable.id, { onDelete: 'cascade' }),
  taskDate: timestamp('task_date').notNull(), // Data em que a task deverá ser realizada
  description: text('description').notNull(), // Descrição da task
  isDone: boolean('is_done').notNull().default(false), // Indica se a task foi concluída
  duration: integer('duration').notNull(), // Duração da task (em minutos, por exemplo)
  completedAt: timestamp('completed_at'), // Data em que a task foi completada (null se não concluída)
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Tipos para inserção e seleção de dados
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertMonthlyGoal = typeof monthlyGoalsTable.$inferInsert;
export type SelectMonthlyGoal = typeof monthlyGoalsTable.$inferSelect;

export type InsertTask = typeof tasksTable.$inferInsert;
export type SelectTask = typeof tasksTable.$inferSelect;
