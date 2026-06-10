import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: serial().primaryKey(),
  items: text("items").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
