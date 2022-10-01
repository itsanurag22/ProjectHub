
from tracker_app.serializers import  ProjectSerializer, UserProjectsSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from tracker_app.models import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_extensions.mixins import NestedViewSetMixin
from tracker_app.permissions import IsProjectMemberOrReadOnly, IsUserAllowed


class ProjectViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
     """
     Only project members, admins can edit the project details
     and any authenticated user can create or view the projects.
     """
     queryset=Project.objects.all()
     serializer_class=ProjectSerializer
     authentication_classes=[SessionAuthentication, TokenAuthentication]

     def perform_create(self, serializer):
          serializer.validated_data['project_members'].append(self.request.user)
          serializer.save(creator = self.request.user)
          

     def get_permissions(self):
          if self.request.method == "POST" or self.request.method =="GET":
               self.permission_classes = [IsAuthenticated, IsUserAllowed]
          elif self.request.method == "PUT" or self.request.method == "PATCH" or self.request.method == "DELETE":
               self.permission_classes = [IsAuthenticated, IsUserAllowed, IsProjectMemberOrReadOnly]
          return super(ProjectViewSet, self).get_permissions()


class UserProjectsViewSet(viewsets.ReadOnlyModelViewSet):
     serializer_class=UserProjectsSerializer
     permission_classes = [IsUserAllowed, IsAuthenticated]
     authentication_classes=[SessionAuthentication, TokenAuthentication]
     def get_queryset(self):
         user = self.request.user
         queryset = Project.objects.filter(project_members=user) 
         return queryset