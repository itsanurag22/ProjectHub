from tracker_app.serializers import CardSerializer, UserCardsSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from tracker_app.models import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_extensions.mixins import NestedViewSetMixin
from tracker_app.permissions import IsUserAllowed, IsCardMemberOrReadOnly, DontAllow



class CardViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
     """
     Only the project members, admins can edit the card details
     any any authenticated user can view the cards.
     """
     queryset=Card.objects.all()
     serializer_class=CardSerializer
     authentication_classes=[SessionAuthentication, TokenAuthentication]
     def get_permissions(self):

          if self.request.method == "POST":
               try:    
                    list_id = int(self.request.data.get("parent_list"))
                    list_ob = List.objects.get(id=list_id)
                    if(self.request.user in list_ob.parent_project.project_members.all()):
                         self.permission_classes = [IsAuthenticated, IsUserAllowed]
                    else:
                         self.permission_classes = [DontAllow]
     
               except:
                    self.permission_classes = [IsAuthenticated, IsUserAllowed, IsCardMemberOrReadOnly]
          else:
               self.permission_classes = [IsAuthenticated, IsUserAllowed, IsCardMemberOrReadOnly]
          return super(CardViewSet, self).get_permissions()


class UserCardsViewSet(viewsets.ReadOnlyModelViewSet):
     serializer_class= UserCardsSerializer
     permission_classes = [IsUserAllowed, IsAuthenticated]
     authentication_classes=[SessionAuthentication, TokenAuthentication]
     def get_queryset(self):
         user = self.request.user
         queryset = Card.objects.filter(assignees=user) 
         return queryset
