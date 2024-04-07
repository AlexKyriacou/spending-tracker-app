import { Button } from "@/components/ui/button";
import { FormControl, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import ErrorMessage from "./error-message";

const RecurringTransactionField: React.FC<{
  control: any;
}> = ({ control }) => {
  return (
    <div>
      <div className="flex items-center space-x-4 rounded-md border p-4">
        <Label className="mx-2 whitespace-nowrap">Occurs every</Label>
        <FormField
          control={control}
          name="recurrenceValue"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value || ""}
              className="mx-2 w-20"
              placeholder="0"
              type="number"
              inputMode="numeric"
            />
          )}
        />
        <FormField
          control={control}
          name="recurrencePeriod"
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="mx-2 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
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
          control={control}
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
                  onSelect={(date) => field.onChange(date)}
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
      {/* Reusable ErrorMessage component */}
      <ErrorMessage
        error={control._formState.errors.recurrenceValue}
        message="Please enter a valid recurrence value."
      />
      <ErrorMessage
        error={control._formState.errors.recurrencePeriod}
        message="Please select a recurrence period."
      />
      <ErrorMessage
        error={control._formState.errors.recurrenceEndDate}
        message="Please select a valid end date."
      />
    </div>
  );
};

export default RecurringTransactionField;
