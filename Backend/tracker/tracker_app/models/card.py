from django.db import models
from ckeditor.fields import RichTextField
from tracker_app.models import List
from tracker_app.models import User


class Card(models.Model):

    name = models.CharField(
        max_length=50,
    )

    description = RichTextField()

    created = models.DateTimeField(
        auto_now_add=True,
    )

    due_date = models.DateTimeField()

    parent_list = models.ForeignKey(
        List, 
        on_delete=models.CASCADE, 
        related_name='cards',
    )

    assignees = models.ManyToManyField(
        User, 
        blank=True,
    )
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = [
            'id',
        ]