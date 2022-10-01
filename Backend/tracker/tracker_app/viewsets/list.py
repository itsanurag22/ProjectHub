from tracker_app.serializers import ListSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from tracker_app.models import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_extensions.mixins import NestedViewSetMixin
from tracker_app.permissions import IsUserAllowed, IsListMemberOrReadOnly, DontAllow




class ListViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
     """
     Only the project members, admins can edit the list details
     any any authenticated user can view the lists.
     """
     queryset=List.objects.all()
     serializer_class=ListSerializer
     authentication_classes=[SessionAuthentication, TokenAuthentication]
     def get_permissions(self):
          if self.request.method == "POST":
               try:
                    project_id = int(self.request.data.get("parent_project"))
                    projects = Project.objects.get(id=project_id)
                    if(self.request.user in projects.project_members.all()):
                         self.permission_classes = [IsAuthenticated, IsUserAllowed]
                    else:
                         self.permission_classes = [DontAllow]

               except:
                    self.permission_classes=[IsAuthenticated, IsListMemberOrReadOnly, IsUserAllowed ]
               #self.permission_classes = [DontAllow]
          else:
               self.permission_classes=[IsAuthenticated, IsListMemberOrReadOnly, IsUserAllowed ]
          return super(ListViewSet, self).get_permissions()
     