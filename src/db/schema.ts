import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const dogs = pgTable("dog", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageUrl: text("image_url").notNull(),
  name: text("name").notNull(),
  gender: text("gender").notNull(), // 'male' | 'female'
  comment: text("comment"),
  tag: text("tag").notNull(), // auto-generated
  lastSeenDate: text("last_seen_date").notNull(),
  lastSeenTime: text("last_seen_time").notNull(),
});

export type Dog = typeof dogs.$inferSelect;
export type NewDog = typeof dogs.$inferInsert;
