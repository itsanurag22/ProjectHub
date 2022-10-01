from rest_framework import serializers
from tracker_app.models import List

class ListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = List
        fields = [
            'id', 
            'name', 
            'parent_project'
        ]