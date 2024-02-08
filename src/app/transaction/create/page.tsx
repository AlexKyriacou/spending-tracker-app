import CreateTransactionForm from "@/app/transaction/create/create-transaction-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateTransactionPage() {
  return (
    <>
      <div className="flex-1 lg:max-w-2xl mx-auto space-y-6 pt-10">
        <div>
          <h3 className="text-lg font-medium">New Transaction</h3>
          <p className="text-sm text-muted-foreground">
            Enter the details of your new transaction.
          </p>
        </div>
        <Tabs defaultValue="expense">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expense">Expense</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="expense" className="pt-3">
            <CreateTransactionForm />
          </TabsContent>
          <TabsContent value="income"  className="pt-3">
            <CreateTransactionForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
