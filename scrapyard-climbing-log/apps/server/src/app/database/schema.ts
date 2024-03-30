import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  varchar,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  boolean,
  date,
} from 'drizzle-orm/pg-core';

export const gradeEnum = pgEnum('grade', [
  'V?',
  'VB',
  'VB+',
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  '5.6',
  '5.7',
  '5.8',
  '5.9',
  '5.10-',
  '5.10',
  '5.10+',
  '5.11-',
  '5.11',
  '5.11+',
  '5.12-',
  '5.12',
  '5.12+',
  '5.13-',
  '5.13',
  '5.13+',
  '5.14-',
  '5.14',
  '5.14+',
  '5.15-',
  '5.15',
  '5.15+',
]);

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const colorEnum = pgEnum('color', [
  'red',
  'blue',
  'green',
  'yellow',
  'black',
  'white',
  'purple',
  'orange',
  'pink',
  'seafoam',
]);

// routes
export const routes = pgTable('route', {
  id: serial('id').primaryKey(),
  grade: gradeEnum('grade').notNull(),
  dateSet: date('dateSet').notNull(),
  dateArchived: date('dateArchived'),
  archived: boolean('archived').default(false),
  image: varchar('image', { length: 300 }),
  color: colorEnum('color').notNull(),
  wallId: varchar('wallId')
    .notNull()
    .references(() => walls.name),
});

export type InsertRouteDTO = InferInsertModel<typeof routes>;
export type SelectRouteDTO = InferSelectModel<typeof routes>;

// walls
export const walls = pgTable('wall', {
  name: varchar('name', { length: 20 }).primaryKey(),
});

// route notes
export const routeNotes = pgTable('route_note', {
  id: serial('id').primaryKey(),
  notes: text('notes').default(''),
  sent: boolean('sent').default(false),
  attempts: integer('attempts').default(0),
  userId: varchar('userId')
    .notNull()
    .references(() => users.userId),
  routeId: integer('routeId')
    .notNull()
    .references(() => routes.id),
});

// users
export const users = pgTable('user', {
  userId: varchar('userId', { length: 100 }).primaryKey(),
  role: roleEnum('role').default('user'),
});
