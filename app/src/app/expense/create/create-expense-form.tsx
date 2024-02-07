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
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Please enter an amount.",
      invalid_type_error: "Please enter an amount.",
    })
    .nonnegative("Must be a positive number")
    .multipleOf(0.01, {
      message: "Must be a maximum of 2 decimal places",
    }),

  category: z.string({
    required_error: "Please select an category.",
  }),

  date: z.coerce.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),

  recurrenceValue: z.coerce
    .number({
      required_error: "Please enter a value.",
      invalid_type_error: "Please enter a number.",
    })
    .multipleOf(1, { message: "Must be a whole number" })
    .nonnegative({
      message: "Must be a positive number",
    }),

  recurrencePeriod: z.string({
    required_error: "Please select a period.",
  }),

  recurrenceEndDate: z.coerce
    .date({
      required_error: "Please select an end date.",
      invalid_type_error: "That's not a date!",
    })
    .optional(),

  recurring: z.boolean({
    required_error: "Please select a recurring option.",
  }),
});

export default function CreateExpenseForm() {
  const [isRecurring, setIsRecurring] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      recurrencePeriod: "Days",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
                  placeholder="$0.00"
                  type="number"
                  inputMode="decimal"
                  {...field}
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
              <FormDescription>
                Or add a {""}
                <Link href="/category/create">new category</Link>
              </FormDescription>
              <FormMessage />
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
                  onCheckedChange={(value) => {
                    setIsRecurring(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRecurring && (
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <Label className="mx-2 whitespace-nowrap">Occurs every</Label>
            <FormField
              control={form.control}
              name="recurrenceValue"
              render={({ field }) => (
                <Input
                  className="mx-2 w-20"
                  placeholder="0"
                  type="number"
                  inputMode="numeric"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="recurrencePeriod"
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}>
                  <SelectTrigger className="mx-2 w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Days">Days</SelectItem>
                    <SelectItem value="Weeks">Weeks</SelectItem>
                    <SelectItem value="Months">Months</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Label className="mx-2 whitespace-nowrap">ending</Label>{" "}
            <FormField
              control={form.control}
              name="recurrenceEndDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal w-[180px]")}>
                        {field.value ? (
                          format(field.value, "PP")
                        ) : (
                          <span>Never</span>
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
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
