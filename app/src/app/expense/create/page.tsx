import CreateExpenseForm from "@/app/expense/create/create-expense-form";
import { NavMenu } from "@/components/nav/nav-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateExpensePage() {
  return (
    <>
      <div className="flex-1 lg:max-w-2xl mx-auto space-y-6 pt-10">
        <div>
          <h3 className="text-lg font-medium">New Transaction</h3>
          <p className="text-sm text-muted-foreground">
            Enter the details of your new expense.
          </p>
        </div>
        <Tabs defaultValue="expense">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expense">Expense</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="expense" className="pt-3">
            <CreateExpenseForm />
          </TabsContent>
          <TabsContent value="income"  className="pt-3">
            <CreateExpenseForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
