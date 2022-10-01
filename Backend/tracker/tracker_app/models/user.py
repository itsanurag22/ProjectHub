
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    """
    Abstract model that includes all the user information under one model.
    """
    username = models.CharField(
        max_length=50, 
        unique=True
    )

    fullname = models.CharField(
        max_length=100,
    )

    email_address = models.EmailField(
        max_length=255,
    )

    admin_check = models.BooleanField(
        default=False
    )

    display_picture = models.ImageField(
        blank=True
    )

    banned = models.BooleanField(
        default=False
    )

    def __str__(self):
        return self.username

    class Meta:
        ordering = [
            'id',
        ]

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

        