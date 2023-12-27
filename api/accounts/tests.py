from graphql_jwt.testcases import JSONWebTokenTestCase
from graphql_jwt.shortcuts import create_refresh_token, get_token
from django.contrib.auth import get_user_model
from freezegun import freeze_time
from django.utils import timezone


class RegisterMutationTest(JSONWebTokenTestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="test", password="testpassword", email="test@example.com"
        )
        self.refresh_token = create_refresh_token(self.user)
        self.token = get_token(self.user)

    def test_register_valid(self):
        query = """
            mutation Register($username: String!, $password: String!, $email: String!) {
                register(username: $username, password: $password, email: $email) {
                    user {
                        username
                        email
                    }
                }
            }
        """  # noqa: E501
        variables = {
            "username": "test2",
            "password": "testpassword2",
            "email": "test2@example.com",
        }
        response = self.client.execute(query, variables)
        self.assertIsNone(response.errors)
        self.assertEqual(response.data["register"]
                         ["user"]["username"], "test2")
        self.assertEqual(
            response.data["register"]["user"]["email"], "test2@example.com"
        )

    def test_register_invalid_email(self):
        query = """
            mutation Register($username: String!, $password: String!, $email: String!) {
                register(username: $username, password: $password, email: $email) {
                    user {
                        username
                        email
                    }
                }
            }
        """  # noqa: E501
        variables = {
            "username": "test3",
            "password": "testpassword3",
            "email": "invalidemail",
        }
        response = self.client.execute(query, variables)
        self.assertIsNotNone(response.errors)
        self.assertEqual(
            response.errors[0].message,
            "Enter a valid email address.",
        )

    def test_register_short_password(self):
        query = """
            mutation Register($username: String!, $password: String!, $email: String!) {
                register(username: $username, password: $password, email: $email) {
                    user {
                        username
                        email
                    }
                }
            }
        """  # noqa: E501
        variables = {
            "username": "test4",
            "password": "short",
            "email": "test4@example.com",
        }
        response = self.client.execute(query, variables)
        self.assertIsNotNone(response.errors)
        self.assertEqual(
            response.errors[0].message,
            "This password is too short. It must contain at least 8 characters."  # noqa: E501
        )

    def test_login_valid(self):
        query = """
            mutation TokenAuth($username: String!, $password: String!) {
                tokenAuth(username: $username, password: $password) {
                    token
                }
            }
        """
        variables = {"username": "test", "password": "testpassword"}
        response = self.client.execute(query, variables)
        self.assertIsNone(response.errors)
        self.assertIsNotNone(response.data["tokenAuth"]["token"])

    def test_login_invalid_password(self):
        query = """
            mutation TokenAuth($username: String!, $password: String!) {
                tokenAuth(username: $username, password: $password) {
                    token
                }
            }
        """
        variables = {"username": "test", "password": "wrongpassword"}
        response = self.client.execute(query, variables)
        self.assertIsNotNone(response.errors)
        self.assertEqual(
            response.errors[0].message, "Please enter valid credentials"
        )

    def test_refresh_token(self):
        query = """
            mutation RefreshToken($refreshToken: String!) {
                refreshToken(refreshToken: $refreshToken) {
                    refreshToken
                    token
                    payload
                }
            }
        """
        variables = {"refreshToken": self.refresh_token.token}
        response = self.client.execute(query, variables)
        self.assertIsNone(response.errors)
        self.assertEqual(
            self.user.username,
            response.data["refreshToken"]["payload"]["username"]
        )
        self.assertIsNotNone(response.data["refreshToken"]["token"])
        self.assertIsNotNone(response.data["refreshToken"]["refreshToken"])

    @freeze_time(timezone.now())
    def test_refresh_token_expiry(self):
        query = """
            mutation RefreshToken($refreshToken: String!) {
                refreshToken(refreshToken: $refreshToken) {
                    refreshToken
                    token
                    payload
                }
            }
        """
        variables = {"refreshToken": self.refresh_token.token}
        response = self.client.execute(query, variables)
        self.assertIsNone(response.errors)

        # Advance the time by more than 7 days
        with freeze_time(timezone.now() + timezone.timedelta(days=8)):
            response = self.client.execute(query, variables)
            self.assertIsNotNone(response.errors)
            self.assertEqual(
                response.errors[0].message, "Refresh token is expired"
            )
