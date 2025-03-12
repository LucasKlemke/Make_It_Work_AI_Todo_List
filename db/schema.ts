import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  primaryKey,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';
import { db } from './index';
import { eq } from 'drizzle-orm';
import { genSaltSync, hashSync } from 'bcrypt-ts';

export async function getUser(email: string) {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
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
