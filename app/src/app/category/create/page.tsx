import { Separator } from "@/components/ui/separator";
import CreateCategoryForm from "./create-category-form";

export default function CreateTransactionPage() {
  return (
    <>
      <div className="flex-1 lg:max-w-2xl mx-auto space-y-6 pt-10">
        <div>
          <h3 className="text-lg font-medium">New Category</h3>
        </div>
        <Separator />
        <CreateCategoryForm />
      </div>
    </>
  );
}
