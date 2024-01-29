"use client"

import {
  Card,
} from "@/components/ui/card"
import CreateExpenseForm from "@/components/create-expense-form"
import { NavigationMenuDemo } from "@/components/nav-menu"

export default function CreateExpensePage() {
  return (
    <>
      <NavigationMenuDemo />
      <Card className={"flex items-center justify-center min-h-screen"}>
        <CreateExpenseForm />
      </Card>
    </>
  )
}
