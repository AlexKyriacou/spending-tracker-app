from django.contrib import admin
from expenses.models import Expense, Category


class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Category, CategoryAdmin)


class ExpenseAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Expense, ExpenseAdmin)
