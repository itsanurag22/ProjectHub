from django.db import models
from ckeditor.fields import RichTextField
from tracker_app.models import Card
from tracker_app.models import User

class Comment(models.Model):
    
    parent_card = models.ForeignKey(
        Card, 
        on_delete=models.CASCADE, 
        related_name='comments'
    )

    commentor = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='your_comments'
    )

    body = models.CharField(
        max_length=200,
    )
    
    def __str__(self):
        return f"{self.body} commented by {self.commentor}"

    class Meta:
        ordering = [
            'id',
        ]