import * as z from "zod";

export const categoryFormSchema = z.object({
    name: z.string({
      required_error: "Please enter an category.",
    }),
    type: z.string({
      required_error: "Please select a type.",
    }).refine((type) => type === "EXPENSE" || type === "INCOME", {
      message: "Please select a valid type.",
    }),
    icon: z.string({
      required_error: "Please select an icon.",
    }).emoji({
        message: "Please select a valid emoji.",
    }).length(1, {
        message: "Please select a valid emoji.",
    }).optional(),
  });