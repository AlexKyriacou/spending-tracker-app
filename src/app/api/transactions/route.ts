import { auth } from "@/lib/auth";
import * as z from "zod";
import { db } from "@/lib/db";
import TransactionSchema from "@/app/transaction/create/components/form-schema";
import { transaction, category, recurrence } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";

type NewTransaction = typeof transaction.$inferInsert;
type NewRecurrence = typeof recurrence.$inferInsert;

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = await validateSession(session);

    const json = await req.json();
    const body = TransactionSchema.parse(json);

    const categoryId = await getCategoryId(body.category);
    if (!categoryId) {
      return new Response("Category not found", { status: 404 });
    }

    let recurrenceId: string | null = null;
    const newRecurrence = createRecurrenceObject(body);
    if (newRecurrence) {
      recurrenceId = await insertRecurrence(newRecurrence);
    }

    const newTransaction = createTransactionObject(
      user.id!,
      categoryId,
      recurrenceId,
      body
    );
    const newTransactionId = await insertTransaction(newTransaction);

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

const getCategoryId = async (categoryName: string) => {
  const categoryId = await db
    .select({ category_id: category.id })
    .from(category)
    .where(eq(category.name, categoryName))
    .limit(1);

  return categoryId.length > 0 ? categoryId[0].category_id : null;
};

const getExpenseType = (amount: number): "EXPENSE" | "INCOME" => {
  return amount < 0 ? "EXPENSE" : "INCOME";
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

const insertRecurrence = async (newRecurrence: NewRecurrence) => {
  const newRecurrenceId = (
    await db
      .insert(recurrence)
      .values(newRecurrence)
      .returning({ recurrenceId: recurrence.id })
  )[0].recurrenceId;

  return newRecurrenceId;
};

const createTransactionObject = (
  userId: string,
  categoryId: string,
  recurrenceId: string | null,
  body: z.infer<typeof TransactionSchema>
) => {
  const expense_type = getExpenseType(body.amount);
  const newTransaction: NewTransaction = {
    userId,
    date: new Date(body.date),
    amount: body.amount,
    categoryId,
    type: expense_type,
    recurrenceId,
  };

  return newTransaction;
};

const insertTransaction = async (newTransaction: NewTransaction) => {
  const newTransactionId = (
    await db
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
