import CreateTransactionForm from "./components/create-transaction-form";

export default function CreateTransactionPage() {
  return (
    <div className="flex-1 lg:max-w-2xl mx-auto space-y-6 pt-10">
      <div>
        <h3 className="text-lg font-medium">New Transaction</h3>
        <p className="text-sm text-muted-foreground">
          Enter the details of your new transaction.
        </p>
      </div>
      <CreateTransactionForm />
    </div>
  );
}
