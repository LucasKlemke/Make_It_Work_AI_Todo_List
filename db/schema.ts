import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  primaryKey,
} from 'drizzle-orm/pg-core';
// @ts-ignore
import type { AdapterAccount } from 'next-auth/adapters';
import { db } from './index';
import { eq, gte, and, InferSelectModel } from 'drizzle-orm';
import { genSaltSync, hashSync } from 'bcrypt-ts';

export async function getUser(email: string) {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function deletePlan(goalId: number) {
  return await db
    .delete(monthlyGoalsTable)
    .where(eq(monthlyGoalsTable.id, goalId));
}

export async function createUser(
  name: string,
  age: number,
  email: string,
  password: string
) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);
  const user = db.select().from(usersTable);
  console.log(user);

  return await db.insert(usersTable).values({
    name,
    email,
    age,
    password: hash,
    emailVerified: new Date(),
    createdAt: new Date(),
    image: '',
  });
}

export async function createGoal(
  userId: string,
  objective: string,
  description: string,
  methodology: string
) {
  // obter o mês atual
  let date = new Date();
  let month = new Date(date.getFullYear(), date.getMonth(), 1);

  const result = await db
    .insert(monthlyGoalsTable)
    .values({
      userId,
      objective,
      description,
      methodology,
      month,
      createdAt: new Date(),
    })
    .returning({ id: monthlyGoalsTable.id });

  return result[0]?.id;
}

export const createTasks = async (tasks: InsertTask[]) => {
  return await db.insert(tasksTable).values(tasks);
};

export const updateTask = async (taskId: number, completedAt: Date) => {
  return await db
    .update(tasksTable)
    .set({ completedAt })
    .where(eq(tasksTable.id, taskId));
};

export const getGoal = async (goalId: number) => {
  return await db
    .select()
    .from(monthlyGoalsTable)
    .where(eq(monthlyGoalsTable.id, goalId));
};

export const getGoals = async (userId: string) => {
  return await db
    .select()
    .from(monthlyGoalsTable)
    .where(eq(monthlyGoalsTable.userId, userId));
};

export const getTasks1 = async (goalId: number) => {
  return await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.monthlyGoalId, goalId));
};

export const getTask = async (task_id: number, goal_id: number) => {
  return await db
    .select()
    .from(tasksTable)
    .where(
      and(eq(tasksTable.id, task_id), eq(tasksTable.monthlyGoalId, goal_id))
    );
};

// Tabela de usuários com informações de verificação e data de cadastro
export const usersTable = pgTable('users_table', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  age: integer('age').notNull(),
  password: text('password').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  image: text('image'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

// Tabela para a meta mensal definida pelo usuário
export const monthlyGoalsTable = pgTable('monthly_goals', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  objective: text('goal').notNull(), // Objetivo mensal do usuário
  description: text('description'), // Descrição da meta
  methodology: text('methodology'), // Metodologia para atingir a meta
  createdAt: timestamp('created_at').notNull().defaultNow(),
  month: timestamp('month').notNull(), // Data representando o mês (por exemplo, 1º dia do mês)
});

// Tabela para as tasks, cada uma relacionada a uma meta mensal
export const tasksTable = pgTable('tasks', {
  id: serial('id').primaryKey(),
  monthlyGoalId: integer('monthly_goal_id')
    .notNull()
    .references(() => monthlyGoalsTable.id, { onDelete: 'cascade' }),
  taskDate: timestamp('task_date').notNull(), // Data em que a task deverá ser realizada
  description: text('description').notNull(), // Descrição da task
  duration: integer('duration').notNull(), // Duração da task (em minutos, por exemplo)
  completedAt: timestamp('completed_at'), // Data em que a task foi completada (null se não concluída)
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Tipos para inserção e seleção de dados
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertMonthlyGoal = typeof monthlyGoalsTable.$inferInsert;
export type SelectMonthlyGoal = typeof monthlyGoalsTable.$inferSelect;

export type Tasks = InferSelectModel<typeof tasksTable>;
export type Goals = InferSelectModel<typeof monthlyGoalsTable>;
export type InsertTask = typeof tasksTable.$inferInsert;
export type SelectTask = typeof tasksTable.$inferSelect;
