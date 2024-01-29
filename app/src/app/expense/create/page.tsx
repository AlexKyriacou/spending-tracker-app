"use client"

import {
  Card,
} from "@/components/ui/card"
import CreateExpenseForm from "@/components/create-expense-form"

export default function CreateExpensePage() {
  return (
    <Card className={"flex items-center justify-center min-h-screen"}>
      <CreateExpenseForm />
    </Card>
  )
}
