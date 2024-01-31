import CreateExpenseForm from "@/components/create-expense-form";
import { NavMenu } from "@/components/nav/nav-menu";
import { Separator } from "@/components/ui/separator";

export default function CreateExpensePage() {
  return (
    <>
      <NavMenu />
      <div className="flex-1 lg:max-w-2xl mx-auto space-y-6 pt-10">
        <div>
          <h3 className="text-lg font-medium">New Transaction</h3>
          <p className="text-sm text-muted-foreground">
            Enter the details of your new expense.
          </p>
        </div>
        <Separator />
        <CreateExpenseForm />
      </div>
    </>
  );
}
