import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"


export const payments: Transaction[] = [
    {
        id: "1",
        date: new Date(),
        amount: 100,
        category: "Groceries",
        recurring: false,
    },
    {
        id: "2",
        date: new Date(),
        amount: 200,
        category: "Gas",
        recurring: true,
        recurrenceValue: 2,
        recurrencePeriod: "Weeks",
        recurrenceEndDate: new Date(),
    },
    {
        id: "3",
        date: new Date(),
        amount: 300,
        category: "Rent",
        recurring: true,
        recurrenceValue: 1,
        recurrencePeriod: "Months",
        recurrenceEndDate: new Date(),
    },
    {
        id: "4",
        date: new Date(),
        amount: 400,
        category: "Utilities",
        recurring: true,
        recurrenceValue: 1,
        recurrencePeriod: "Months",
        recurrenceEndDate: new Date(),
    },
    {
        id: "5",
        date: new Date(),
        amount: 500,
        category: "Entertainment",
        recurring: false,
    },
    {
        id: "6",
        date: new Date(),
        amount: 600,
        category: "Groceries",
        recurring: false,
    },
    {
        id: "7",
        date: new Date(),
        amount: 700,
        category: "Gas",
        recurring: true,
        recurrenceValue: 2,
        recurrencePeriod: "Weeks",
        recurrenceEndDate: new Date(),
    },
    {
        id: "8",
        date: new Date(),
        amount: 800,
        category: "Rent",
        recurring: true,
        recurrenceValue: 1,
        recurrencePeriod: "Months",
        recurrenceEndDate: new Date(),
    },
    {
        id: "9",
        date: new Date(),
        amount: 900,
        category: "Utilities",
        recurring: true,
        recurrenceValue: 1,
        recurrencePeriod: "Months",
        recurrenceEndDate: new Date(),
    },
    {
        id: "10",
        date: new Date(),
        amount: 1000,
        category: "Entertainment",
        recurring: false,
    },
    {
        id: "11",
        date: new Date(),
        amount: 1100,
        category: "Groceries",
        recurring: false,
    },
];


async function getData(): Promise<Transaction[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(payments);
        }, 1000);
    });
}

export default async function TransactionPage() {
    const data = await getData()
   
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }