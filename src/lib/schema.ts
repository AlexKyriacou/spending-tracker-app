import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  pgEnum,
  date,
  real,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const transactionType = pgEnum("transaction_type", [
  "INCOME",
  "EXPENSE",
]);
export const recurrencePeriod = pgEnum("recurrence_period", [
  "DAYS",
  "WEEKS",
  "MONTHS",
]);

export const transaction = pgTable("transaction", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: date("date", { mode: "date" }).notNull(),
  amount: real("amount").notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  type: transactionType("type").notNull(),
  recurrenceId: uuid("recurrence_id").references(() => recurrence.id, {
    onDelete: "cascade",
  }),
});

export const recurrence = pgTable("recurrence", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: integer("value"),
  period: recurrencePeriod("period"),
  endDate: date("end_date", { mode: "date" }),
});

export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  icon: text("icon"),
});
