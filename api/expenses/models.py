from django.db import models
from django.contrib.auth import get_user_model
from django.forms import ValidationError


class Category(models.Model):
    """
    Represents a category for expenses.

    Attributes:
        user (django.contrib.auth.models.User):
            The user associated with the category.
        name (str): The name of the category.

    Methods:
        __str__(): Returns a string representation of the category.

    """
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Expense(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    # ensure that the category is owned by the same user
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(null=True)
    date = models.DateField()

    def save(self, *args, **kwargs):
        """
        Overides the save method to ensure
        that the expense category is owned by the same user.

        Raises:
            ValidationError: If the expense category is owned by another user.
        """
        if self.category and self.user != self.category.user:
            raise ValidationError("Cannot create an expense with a category owned by another user")  # noqa: E501
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.amount}"
