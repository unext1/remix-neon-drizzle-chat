import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title").notNull(),
  desription: varchar("description").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  userId: integer("user_id").references(() => user.id),
});

export const user = pgTable("user", {
  id: serial("id").primaryKey().notNull(),
  email: varchar("email").notNull(),
  name: varchar("name").notNull(),
  image: varchar("image"),
});

export const usersRelations = relations(user, ({ many }) => ({
  todos: many(todo),
}));

export const todoRelations = relations(todo, ({ one }) => ({
  author: one(user, {
    fields: [todo.userId],
    references: [user.id],
  }),
}));
