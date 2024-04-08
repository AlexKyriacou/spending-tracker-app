import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CategorySelectFieldProps {
  control: any;
  categoryType: "INCOME" | "EXPENSE";
}

const CategorySelectField: React.FC<CategorySelectFieldProps> = ({
  control,
  categoryType,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      const filteredCategories = data.filter(
        (category: { type: "INCOME" | "EXPENSE" }) =>
          category.type === categoryType
      );
      setCategories(filteredCategories);
    };
    fetchCategories();
  }, []);

  return (
    <FormField
      control={control}
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
              {categories.map(
                (category: {
                  name: string;
                  type: "INCOME" | "EXPENSE";
                  icon: string | null;
                }) => (
                  <SelectItem
                    key={category.name}
                    value={category.name}>
                    {category.name}
                  </SelectItem>
                )
              )}
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
  );
};

export default CategorySelectField;
