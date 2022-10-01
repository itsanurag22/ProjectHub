from rest_framework import serializers
from tracker_app.models import Card, User
from tracker_app.serializers import CommentSerializer

class CardSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(
        many=True, 
        read_only=True
    )

    class Meta:
        model = Card
        fields = [
            'id', 
            'name',
            'description',
            'created',
            'due_date', 
            'parent_list', 
            'assignees', 
            'comments' 
        ]


class UserCardsSerializer(serializers.ModelSerializer):

    assignees = serializers.SlugRelatedField(
        many=True, 
        queryset=User.objects.all(), 
        slug_field='fullname'
    )

    class Meta:
        model = Card
        fields = [
            'id', 
            'name',
            'description',
            'created',
            'due_date', 
            'parent_list', 
            'assignees' 
        ]