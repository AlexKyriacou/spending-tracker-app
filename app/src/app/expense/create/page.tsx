"use client";

import { Card } from "@/components/ui/card";
import CreateExpenseForm from "@/components/create-expense-form";
import { NavMenu } from "@/components/nav/nav-menu";

export default function CreateExpensePage() {
  return (
    <>
      <NavMenu />
      <Card className={"flex items-center justify-center min-h-screen"}>
        <CreateExpenseForm />
      </Card>
    </>
  );
}
