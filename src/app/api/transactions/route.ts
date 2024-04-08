import { auth } from "@/lib/auth";
import * as z from "zod";
import { db } from "@/lib/db";
import TransactionSchema from "@/app/transaction/create/components/form-schema";
import { transaction, recurrence } from "@/lib/schema";
import { Session } from "next-auth";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";

type NewTransaction = typeof transaction.$inferInsert;
type NewRecurrence = typeof recurrence.$inferInsert;

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = await validateSession(session);

    const json = await req.json();
    const body = TransactionSchema.parse(json);

    const newTransactionId = await db.transaction(async (tx) => {
      let recurrenceId: string | null = null;
      const newRecurrence = createRecurrenceObject(body);
      if (newRecurrence) {
        recurrenceId = await insertRecurrence(tx, newRecurrence);
      }
      const newTransaction = createTransactionObject(
        user.id!,
        recurrenceId,
        body
      );
      return await insertTransaction(tx, newTransaction);
    });

    console.log("New transaction created:", newTransactionId);
    return new Response(JSON.stringify(newTransactionId));
  } catch (error) {
    return handleError(error);
  }
}

const validateSession = async (session: Session | null) => {
  if (!session) {
    throw new Error("Unauthorized");
  }

  const { user } = session;
  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
};

const createRecurrenceObject = (body: z.infer<typeof TransactionSchema>) => {
  if (!body.recurring) {
    return null;
  }

  const newRecurrence: NewRecurrence = {
    value: body.recurrenceValue,
    period: body.recurrencePeriod.toUpperCase() as "DAYS" | "WEEKS" | "MONTHS",
    endDate: body.recurrenceEndDate,
  };

  return newRecurrence;
};

const insertRecurrence = async (
  dbTransaction: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >,
  newRecurrence: NewRecurrence
) => {
  const newRecurrenceId = (
    await dbTransaction
      .insert(recurrence)
      .values(newRecurrence)
      .returning({ recurrenceId: recurrence.id })
  )[0].recurrenceId;

  return newRecurrenceId;
};

const createTransactionObject = (
  userId: string,
  recurrenceId: string | null,
  body: z.infer<typeof TransactionSchema>
) => {
  const expense_type = "EXPENSE";
  const newTransaction: NewTransaction = {
    userId,
    date: new Date(body.date),
    amount: body.amount,
    categoryName: body.category,
    type: expense_type,
    recurrenceId,
  };

  return newTransaction;
};

const insertTransaction = async (
  dbTransaction: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >,
  newTransaction: NewTransaction
) => {
  console.log("Inserting transaction:", newTransaction);
  const newTransactionId = (
    await dbTransaction
      .insert(transaction)
      .values(newTransaction)
      .returning({ newTransactionId: transaction.id })
  )[0].newTransactionId;

  return newTransactionId;
};

const handleError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    console.log("Validation error:", error.issues);
    return new Response(JSON.stringify(error.issues), { status: 422 });
  }

  if (error instanceof Error) {
    console.log("Internal server error:", error.message);
    return new Response(error.message, { status: 403 });
  }

  console.log("Internal server error:", error);
  return new Response(null, { status: 500 });
};
