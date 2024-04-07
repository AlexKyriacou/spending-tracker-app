import * as z from "zod";

/**
 * Default schema for creating an transaction.
 */
const defaultSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Please enter an amount.",
      invalid_type_error: "Please enter a number.",
    })
    .gt(0, { message: "Must be a positive number" })
    .multipleOf(0.01, {
      message: "Must have a maximum of 2 decimal places",
    }),

  category: z.string({
    required_error: "Please select a category.",
  }),

  date: z.coerce.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),

  recurring: z.boolean({
    required_error: "Please select a recurring option.",
  }),
});

/**
 * Schema for validating non-recurring transactions.
 */
const isNotRecurringSchema = z.object({
  recurring: z.literal(false),
  recurrencePeriod: z.string().optional(),
  recurrenceValue: z.coerce.number().optional(),
  recurrenceEndDate: z.coerce.date().optional(),
});

/**
 * Schema used for validating recurring transactions.
 */
const isRecurringSchema = z.object({
  recurring: z.literal(true),
  recurrenceValue: z.coerce
    .number({
      required_error: "Please enter a value.",
      invalid_type_error: "Please enter a how often this will recur.",
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
});

/**
 * Defines a discriminated union schema for the "recurring" property.
 * When the "recurring" property is set to true, the schema is "isRecurringSchema".
 * When the "recurring" property is set to false, the schema is "isNotRecurringSchema".
 * https://github.com/colinhacks/zod/discussions/2099#discussioncomment-6209674
 */
const schemaCond = z.discriminatedUnion("recurring", [
  isRecurringSchema,
  isNotRecurringSchema,
]);

const CreateTransactionFormaSchema = z.intersection(schemaCond, defaultSchema);

export default CreateTransactionFormaSchema;
