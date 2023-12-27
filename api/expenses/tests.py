from django.forms import ValidationError
from django.test import TestCase
from django.contrib.auth import get_user_model
from expenses.models import Category, Expense
from graphql_jwt.testcases import JSONWebTokenTestCase


class CategoryOwnershipTest(TestCase):
    def setUp(self):
        self.user1 = get_user_model().objects.create_user(
            username='user1', password='password')
        self.user2 = get_user_model().objects.create_user(
            username='user2', password='password')
        self.category1 = Category.objects.create(
            user=self.user1, name='category1')

    def test_category_ownership(self):
        with self.assertRaises(ValidationError):
            Expense.objects.create(
                user=self.user2,
                category=self.category1,
                amount=100.00,
                description='Test expense',
                date='2022-01-01'
            )


class UpdateExpenseTest(JSONWebTokenTestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='user', password='password')
        self.category = Category.objects.create(
            user=self.user, name='category')
        self.expense = Expense.objects.create(
            user=self.user,
            category=self.category,
            amount=100.00,
            description='Test expense',
            date='2022-01-01'
        )
        self.client.authenticate(self.user)

    def test_update_expense(self):
        query = '''
            mutation UpdateExpense($id: ID!, $amount: Float, $categoryId: ID, $description: String, $date: Date) {
                updateExpense(id: $id, amount: $amount, categoryId: $categoryId, description: $description, date: $date) {
                    expense {
                        amount
                        category
                        description
                        date
                    }
                }
            }
        '''  # noqa: E501
        variables = {
            'id': str(self.expense.id),
            'amount': 200.00,
            'categoryId': str(self.category.id),
            'description': 'Updated expense',
            'date': '2022-02-02'
        }
        response = self.client.execute(query, variables)
        self.assertIsNone(response.errors)
        self.assertEqual(
            response.data['updateExpense']['expense']['amount'], 200.00)
        self.assertEqual(
            response.data['updateExpense']['expense']['description'], 'Updated expense')  # noqa: E501
        self.assertEqual(
            response.data['updateExpense']['expense']['date'], '2022-02-02')
