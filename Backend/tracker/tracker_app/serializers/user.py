from rest_framework import serializers
from tracker_app.models import User

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'fullname', 
            'admin_check', 
            'banned', 
            'email_address', 
            'display_picture', 
            'creator_of'
        ]
        