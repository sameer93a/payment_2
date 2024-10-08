import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  index,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { nan, nullable, z } from "zod";

export const onRampStatusEnum = pgEnum("onramp", [
  "Success",
  "Failed",
  "Processing",
]);
export const typeEnum = pgEnum("type", ["Credit", "Debit"]);

export const users = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt", {
      precision: 6,
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (users) => ({
    nameIdx: index("name_idx").on(users.email),
  })
);

export const balance = pgTable("balance", {
  id: serial("id").primaryKey(),
  amount: integer("amount").default(0).notNull(),
  locked: integer("locked"),
  createdAt: timestamp("createdAt", {
    precision: 6,
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const onRampTransaction = pgTable("on_ramp_transaction", {
  id: serial("id").primaryKey(),
  status: onRampStatusEnum("onramp"),
  token: varchar("token", { length: 256 }).notNull(),
  provider: varchar("provider", { length: 256 }).notNull(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  type: typeEnum("type"),
  userId: integer("user_id").references(() => users.id),
});

export const p2pTransfer = pgTable("p2pTransfer", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  fromUserId: integer("from_user_id")
    .references(() => users.id)
    .notNull(),
  toUserId: integer("to_user_id")
    .references(() => users.id)
    .notNull(),
  type: typeEnum("type"),
});

export const transactionHistory = pgTable("transactionHistory", {
  id: serial("id").primaryKey(),
  status: onRampStatusEnum("onramp"),
  type: typeEnum("type"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  amount: integer("amount").notNull(),
  userId: integer("user_id").references(() => users.id),
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users, {
  name: z.string().min(3),
  email: z.string().email(),
});

export const p2pTransferSchema = createInsertSchema(p2pTransfer, {
  amount: z.number(),
  fromUserId: z.number(),
  toUserId: z.number(),
});

export const onramp = createInsertSchema(onRampTransaction, {
  token: z.string(),
  provider: z.string(),
  amount: z.number(),
  type: z.string(),
});
