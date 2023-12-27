import graphene
import graphql_jwt
from expenses.schema import (
    ExpensesQuery, CreateExpenseMutation, UpdateExpenseMutation)
from accounts.schema import Register


class Query(graphene.ObjectType):
    expenses = graphene.Field(ExpensesQuery.expenses,
                              resolver=ExpensesQuery.resolve_expenses)
    categories = graphene.Field(
        ExpensesQuery.categories, resolver=ExpensesQuery.resolve_categories)


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()
    register = Register.Field()
    create_expense = CreateExpenseMutation.Field()
    update_expense = UpdateExpenseMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
