from rest_framework import serializers
from tracker_app.models import Project, User
from tracker_app.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only = True) 
    
    class Meta:
        model = Project
        fields = [
            'id', 
            'name',
            'description', 
            'creator', 
            'project_members'
        ]


class UserProjectsSerializer(serializers.ModelSerializer):

    project_members = serializers.SlugRelatedField(
        many=True, 
        slug_field='fullname', 
        queryset=User.objects.all()
    )

    creator = UserSerializer(
        read_only = True
    )

    class Meta:
        model = Project
        fields = [
            'id', 
            'name',
            'description', 
            'creator', 
            'project_members'
        ]
