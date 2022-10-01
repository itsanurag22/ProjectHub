from django.db import models
from tracker_app.models import Project

class List(models.Model):
    name = models.CharField(
        max_length=50,
    )

    parent_project = models.ForeignKey(
        Project, 
        on_delete=models.CASCADE, 
        related_name='lists',
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = [
            'id',
        ]