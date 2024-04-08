import CreateCategoryForm from "./components/create-category-form";

export default function CreateCategorynPage() {
  return (
    <div className="flex-1 lg:max-w-2xl mx-auto space-y-6 pt-10">
      <div>
        <h3 className="text-lg font-medium">New Category</h3>
        <p className="text-sm text-muted-foreground">
          Enter the details of your new category.
        </p>
      </div>
      <CreateCategoryForm />
    </div>
  );
}
