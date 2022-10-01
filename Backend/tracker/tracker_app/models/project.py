from django.db import models
from ckeditor.fields import RichTextField
from tracker_app.models import User


class Project(models.Model):
    name = models.CharField(
        max_length=50, 
        unique=True
    )

    description = RichTextField()

    creator = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='creator_of',
    )

    project_members = models.ManyToManyField(
        User, 
        blank=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = [
            'id',
        ]