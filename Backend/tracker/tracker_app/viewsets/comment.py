from tracker_app.serializers import CommentSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from tracker_app.models import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_extensions.mixins import NestedViewSetMixin
from tracker_app.permissions import IsCommentorOrAdmin, IsCommentor, IsUserAllowed


class CommentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
     """
     Only the commentor can edit their own comments
     any any authenticated user can view the comments.
     """
     queryset=Comment.objects.all()
     serializer_class=CommentSerializer
     authentication_classes=[SessionAuthentication, TokenAuthentication]
  
     def perform_create(self, serializer):
         serializer.save(commentor = self.request.user)
     
     def get_permissions(self):
          if self.request.method =='PUT' or self.request.method == "PATCH":
               self.permission_classes = [IsUserAllowed, IsCommentor, IsAuthenticated]
          elif self.request.method =="DELETE":
               self.permission_classes = [IsUserAllowed, IsAuthenticated, IsCommentorOrAdmin]
          else:
               self.permission_classes = [IsUserAllowed, IsAuthenticated]

          return super(CommentViewSet, self).get_permissions()