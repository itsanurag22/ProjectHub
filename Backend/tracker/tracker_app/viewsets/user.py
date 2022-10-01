from django.contrib.auth.models import User
from tracker_app.serializers import UserSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from tracker_app.models import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_extensions.mixins import NestedViewSetMixin
from tracker_app.permissions import IsAdminCheck, IsUserAllowed, DontAllow



class UserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
     """
     Only admins can change the status of users in the app
     Normal users can just view the members.
     """
     queryset=User.objects.all()
     serializer_class=UserSerializer
     authentication_classes = [SessionAuthentication, TokenAuthentication]
     def get_permissions(self):
          if self.request.method == "GET":
               self.permission_classes = [IsAuthenticated, IsUserAllowed] 
          elif self.request.method == "POST" or self.request.method == "DELETE":
               self.permission_classes = [DontAllow]
          else:
               self.permission_classes = [IsUserAllowed, IsAuthenticated, IsAdminCheck]
          return super(UserViewSet, self).get_permissions()


class CurrentUserViewset(viewsets.ReadOnlyModelViewSet):
     serializer_class=UserSerializer
     permission_classes = [IsUserAllowed, IsAuthenticated]
     authentication_classes=[SessionAuthentication, TokenAuthentication]
     def get_queryset(self):
         user = self.request.user
         queryset = User.objects.get(project_members=user) 
         return queryset
