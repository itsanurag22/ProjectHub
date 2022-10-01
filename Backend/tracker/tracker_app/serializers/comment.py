from rest_framework import serializers
from tracker_app.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields='__all__'
