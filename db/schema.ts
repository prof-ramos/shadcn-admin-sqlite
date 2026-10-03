import { sql } from "drizzle-orm";
import { sqliteTable, text, index, uniqueIndex, integer, primaryKey } from "drizzle-orm/sqlite-core";
export const tasks = sqliteTable("tasks", { id: text("id").primaryKey(), ownerId: text("owner_id").notNull(), title: text("title").notNull(), description: text("description").notNull().default(""), status: text("status").notNull().default("todo"), priority: text("priority").notNull().default("medium"), label: text("label").notNull().default("general"), dueDate: text("due_date"), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(), deletedAt: text("deleted_at") }, t => [index("idx_tasks_owner_created").on(t.ownerId,t.createdAt)]);
export const members = sqliteTable("members", { id: text("id").primaryKey(), ownerId: text("owner_id").notNull(), name: text("name").notNull(), email: text("email").notNull(), role: text("role").notNull().default("member"), status: text("status").notNull().default("active"), team: text("team").notNull().default(""), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(), deletedAt: text("deleted_at") }, t => [index("idx_members_owner_created").on(t.ownerId,t.createdAt),uniqueIndex("idx_members_owner_email").on(t.ownerId,t.email).where(sql`${t.deletedAt} IS NULL`)]);

export const studyProgress = sqliteTable("study_progress", {
  ownerId: text("owner_id").notNull(),
  topicId: text("topic_id").notNull(),
  completed: integer("completed", {mode:"boolean"}).notNull().default(false),
  updatedAt: text("updated_at").notNull(),
}, t => [primaryKey({columns:[t.ownerId,t.topicId]})]);
