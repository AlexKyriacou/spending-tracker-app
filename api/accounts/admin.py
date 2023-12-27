from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    """
    Admin class for managing custom user accounts.

    What it does:
        - Registers the CustomUser model with the admin site.
        - Sets the add form and edit form for the CustomUser model.
        - Configures the list display for the CustomUser model.

    Inherits from:
        UserAdmin: The base admin class for user accounts.
    """
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = [
        "email",
        "username",
    ]


admin.site.register(CustomUser, CustomUserAdmin)
