import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from django.core import validators
from django.core.exceptions import ValidationError
import django.contrib.auth.password_validation as password_validation
from graphql import GraphQLError


class UserType(DjangoObjectType):
    """Represents a user type in the system.

    Args:
        DjangoObjectType: The base type for Django models.

    Attributes:
        model: The Django model associated with the user type.
        exclude: The fields to exclude from the user type.
    """
    class Meta:
        model = get_user_model()
        exclude = (
            "password",
            "is_superuser",
            "is_staff",
            "is_active",
            "date_joined",
            "last_login",
        )


class Register(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        """Mutates the data to create a new user.

        Args:
            info (GraphQLResolveInfo): The information about the GraphQL execution.
            username (str): The username of the user.
            password (str): The password of the user.
            email (str): The email of the user.

        Raises:
            GraphQLError: If there are validation errors.

        Returns:
            Register: The registered user object.
        """  # noqa: E501
        error_message = ''

        try:
            validators.validate_email(email)
        except ValidationError as e:
            error_message += '\n'.join(e.messages)

        try:
            # use Django's password validation set by
            # AUTH_PASSWORD_VALIDATORS in settings
            password_validation.validate_password(password)
        except ValidationError as e:
            error_message += '\n'.join(e.messages)

        if error_message:
            raise GraphQLError(error_message)

        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return Register(user=user)
