"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import CreateTransactionFormaSchema from "./form-schema";
import RecurringTransactionField from "./recurring-transaction-field";

export default function CreateTransactionForm() {
  const form = useForm<z.infer<typeof CreateTransactionFormaSchema>>({
    resolver: zodResolver(CreateTransactionFormaSchema),
    defaultValues: {
      date: new Date(),
      recurrencePeriod: "Days",
      recurring: false,
    },
  });

  const [isRecurring, setIsRecurring] = useState(false);

  function onSubmit(data: z.infer<typeof CreateTransactionFormaSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="$0.00"
                  type="number"
                  inputMode="decimal"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Potatos">Potatos</SelectItem>
                  <SelectItem value="Coffee">Coffee</SelectItem>
                  <SelectItem value="Ducks">Ducks</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription>
                Or add a {""}
                <Link href="/category/create">new category</Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}>
                      {field.value ? (
                        format(field.value, "PP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date)}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recurring"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormLabel>Recurring</FormLabel>
              <FormControl>
              <Switch
                  checked={isRecurring}
                  onCheckedChange={(value: boolean) => {
                    setIsRecurring(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRecurring && <RecurringTransactionField control={form.control} />}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}