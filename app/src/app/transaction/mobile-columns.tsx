"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  category: string;
  recurring: boolean;
  recurrenceValue?: number;
  recurrencePeriod?: "Days" | "Weeks" | "Months";
  recurrenceEndDate?: Date;
};

export const mobileColumns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    /* This is named category to prevent an error where the switch to a mobile layout results in the column names not existing for a brief moment */
    accessorKey: "category", 
    header: "Transaction",
    accessorFn: ({ category }) => (
      category
    ),
    cell: ({ row }) => {
      const transaction = row.original;

      const date = transaction.date as Date;
      const formattedDate = new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);

      const amount = transaction.amount;
      const formattedAmount = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(amount);

      const category = transaction.category;

      return (
        <div className="flex h-16 items-center px-4">
          <div>
            <div className="text-lg font-semibold">{category}</div>
            {transaction.recurring ? (
              <div className="flex items-center">
                <div className="mr-2">{formattedDate}</div>
                <RefreshCw size={16} />
              </div>
            ) : (
              <div>{formattedDate}</div>
            )}
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <p>{formattedAmount}</p>
          </div>
        </div>
      );
    },
  },
];
