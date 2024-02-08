"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";

import { DataTableColumnHeader } from "./components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./components/data-table-row-actions";

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

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
      />
    ),
    cell: ({ row }) => {
      const transaction = row.original;
      const date = row.getValue("date") as Date;
      const formatted = new Intl.DateTimeFormat("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
      /* if the transation is recurring show a basic cyclic arrow icon next to the date*/
      return transaction.recurring ? (
        <div className="flex items-center">
          <div className="mr-2">{formatted}</div>
          <RefreshCw size={16} />
        </div>
      ) : (
        <div>{formatted}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
