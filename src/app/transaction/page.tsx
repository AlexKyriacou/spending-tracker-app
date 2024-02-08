"use client";

import { Transaction, columns } from "./columns";
import { DataTable } from "./components/data-table";
import { mobileColumns } from "./mobile-columns";
import { useIsMobile } from "@/lib/use-screen-width";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function TransactionPage() {
  const [data, setData] = useState<Transaction[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 lg:max-w-5xl mx-auto space-y-6 pt-10">
      <div className="flex">
        <div>
          <h3 className="text-lg font-medium">Transactions</h3>
          <p className="text-sm text-muted-foreground">
            View and manage your past transaction.
          </p>
        </div>
        <Button
          asChild
          variant="secondary"
          className="mt-4 ml-auto">
          <Link href="transaction/create">Add New Transaction</Link>
        </Button>
      </div>
      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={data}
      />
    </div>
  );
}
