import graphene
from expenses.models import Expense, Category
from graphql_jwt.decorators import login_required
import logging


class ExpenseType(graphene.ObjectType):
    id = graphene.ID()
    amount = graphene.Float()
    category = graphene.ID()
    description = graphene.String()
    date = graphene.Date()


class CategoryType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()


class ExpensesQuery(graphene.ObjectType):
    expenses = graphene.List(ExpenseType)
    categories = graphene.List(CategoryType)

    @login_required
    def resolve_expenses(self, info):
        user = info.context.user
        logging.error(user.username)
        return Expense.objects.filter(user=user)

    @login_required
    def resolve_categories(self, info):
        user = info.context.user
        return Category.objects.filter(user=user)


class CreateExpenseMutation(graphene.Mutation):
    expense = graphene.Field(ExpenseType)

    class Arguments:
        amount = graphene.Float(required=True)
        category_id = graphene.ID(required=True)
        description = graphene.String()
        date = graphene.Date(required=True)

    @login_required
    def mutate(self, info, amount, category_id, date, description=None):
        user = info.context.user
        category = Category.objects.get(id=category_id)
        if category.user != user:
            raise ValueError("Category does not belong to user")
        expense = Expense.objects.create(
            user=user,
            amount=amount,
            category=category,
            description=description,
            date=date,
        )
        return CreateExpenseMutation(expense=expense)


class UpdateExpenseMutation(graphene.Mutation):
    expense = graphene.Field(ExpenseType)

    class Arguments:
        id = graphene.ID(required=True)
        amount = graphene.Float()
        category_id = graphene.ID()
        description = graphene.String()
        date = graphene.Date()

    @login_required
    def mutate(self,
               info,
               id,
               amount=None,
               category_id=None,
               date=None,
               description=None):
        user = info.context.user
        expense = Expense.objects.get(id=id, user=user)
        if category_id is not None:
            category = Category.objects.get(id=category_id)
            if category.user != user:
                raise ValueError("Category does not belong to user")
            expense.category = category
        if amount is not None:
            expense.amount = amount
        if date is not None:
            expense.date = date
        if description is not None:
            expense.description = description
        expense.save()
        return UpdateExpenseMutation(expense=expense)
