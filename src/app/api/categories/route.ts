import { auth } from "@/lib/auth";
import * as z from "zod";
import { db } from "@/lib/db";
import { category } from "@/lib/schema";
import { Session } from "next-auth";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

type NewCategory = typeof category.$inferInsert;
const insertCategorySchema = createInsertSchema(category);

export async function GET() {
  try {
    const session = await auth();
    const user = await validateSession(session);

    const categories = await db
      .select({
        name: category.name,
        type: category.type,
        icon: category.icon,
      })
      .from(category)
      .where(eq(category.userId, user.id!));
    
    return new Response(JSON.stringify(categories));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = await validateSession(session);

    const json = await req.json();
    const body = insertCategorySchema.parse(json);

    const newCategory = createCategoryObject(user.id!, body);
    await insertCategory(newCategory);

    console.log("New Category created");
    return new Response(null, { status: 201 });
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

const createCategoryObject = (
  userId: string,
  body: z.infer<typeof insertCategorySchema>
) => {
  const newCategory: NewCategory = {
    userId,
    name: body.name,
    type: body.type,
    icon: body.icon,
  };

  return newCategory;
};

const insertCategory = async (newCategory: NewCategory) => {
  await db.insert(category).values(newCategory);
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
