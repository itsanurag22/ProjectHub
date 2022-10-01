import json
from django.http import response
from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from django.http import HttpResponse, Http404
from django.template import loader
from django.urls import path
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import authentication, permissions, serializers
from django.contrib.auth.models import User
from tracker_app.serializers import CommentSerializer, UserCardsSerializer, UserProjectsSerializer, UserSerializer, ProjectSerializer, ListSerializer, CardSerializer
from django.http import JsonResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from decouple import config
from rest_framework.authtoken.models import Token
from tracker_app.models import *
from rest_framework import status, viewsets
import requests
from django.contrib.auth import authenticate, get_user, login, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework_extensions.mixins import NestedViewSetMixin
from tracker_app.permissions import IsAdminCheck, IsCommentorOrAdmin, IsCommentor, IsProjectMemberOrReadOnly, IsUserAllowed, IsListMemberOrReadOnly, IsCardMemberOrReadOnly, DontAllow

from django.middleware.csrf import get_token

@api_view(['GET'])
def index(request):
     for user in User.objects.all():
          Token.objects.get_or_create(user=user)
     return Response({"message": "Welcome to the dashboard!!"})


CLIENT_ID= config('CLIENT_ID')
CLIENT_SECRET_ID= config('CLIENT_SECRET_ID')
REDIRECT_URI=config("REDIRECT_URI")
TOKEN_URL = config("TOKEN_URL")
CLIENT_URL = config("CLIENT_URL")
USERDATA_URL=config("USERDATA_URL")

def login_redirect(request):
     return redirect('{}?client_id={}&redirect_uri={}'.format(CLIENT_URL, CLIENT_ID, REDIRECT_URI))
     

@api_view(['GET'])
def LoginResponse(request):
     code = request.GET.get('code', '')
     post_data = {"client_id":"{}".format(CLIENT_ID),
        "client_secret":"{}".format(CLIENT_SECRET_ID),
        "grant_type":"authorization_code",
        "redirect_uri":"{}".format(REDIRECT_URI),
        "code":"{}".format(code)
        }
     request_token = requests.post("{}".format(TOKEN_URL), data=post_data)
     if(request_token.status_code == 200):
          response_token = request_token.json()
          user_data  = requests.get(USERDATA_URL, headers={"Authorization": "{} {}".format(response_token["token_type"], response_token["access_token"])})
          user_dict = user_data.json()

          isMaintainer=False
          isActive=False

          for item in user_dict['person']['roles']:
               if item['activeStatus'] == 'ActiveStatus.IS_ACTIVE':
                    isActive = True
               if item['role'] == 'Maintainer':
                    isMaintainer = True

          if(isMaintainer):
               if(isActive):
                    try:
                         get_user = User.objects.get(username=user_dict["username"])

                    except :
                         User.objects.create(username=user_dict["username"], fullname=user_dict["person"]["fullName"], email_address=user_dict["contactInformation"]["emailAddress"], banned=False, admin_check=False)
          
                    get_user = User.objects.get(username=user_dict["username"])

                    if get_user.banned == False:
                         login(request, get_user)
                         user_token = Token.objects.get_or_create(user=get_user)[0]
                         # return redirect("http://127.0.0.1:8200/tracker_app/projects/")
                         response = Response({"csrftoken": get_token(request), "sessionid": request.session._session_key, "authtoken":user_token.key, "userid":get_user.id}, status=status.HTTP_200_OK)
                         # response = Response("Login successful", status=status.HTTP_200_OK)
                         # res = Response()
                         # res.set_cookie(key='csrftoken', value=get_token(request))
                         response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
                         response['Access-Control-Allow-Credentials'] = 'true'
                         return response
                    else:
                         response = Response('You are banned', status=status.HTTP_400_BAD_REQUEST)
                         response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
                         response['Access-Control-Allow-Credentials'] = 'true'
                         return response
               else:
                    response = Response('You are not active member', status=status.HTTP_406_NOT_ACCEPTABLE)
                    response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
                    response['Access-Control-Allow-Credentials'] = 'true'
                    return response
     
          else:
               response = Response('You are not a maintainer', status=status.HTTP_403_FORBIDDEN)
               response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
               response['Access-Control-Allow-Credentials'] = 'true'
               return response
     else:
          response = Response('Error', status=status.HTTP_401_UNAUTHORIZED)
          response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
          response['Access-Control-Allow-Credentials'] = 'true'
          return response

          

# @api_view(['GET'])
# def get_token(request):
#      get_user = request.user
#      auth_token = Token.objects.get(user=get_user)
#      response = Response({"csrftoken": get_token(request), "sessionid": request.session._session_key}, status=status.HTTP_200_OK)
#      response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#      response['Access-Control-Allow-Credentials'] = 'true'
#      return response

@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def log_out(request):
     auth_token = Token.objects.get(user=request.user)
     auth_token.delete()
     logout(request)
     response = Response("Logout successful", status=status.HTTP_200_OK)
     response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
     response['Access-Control-Allow-Credentials'] = 'true'
     return response


@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def login_check(request):
     if request.user.is_authenticated and not request.user.banned:
          
          response = Response('User is logged in', status=status.HTTP_200_OK)
          response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
          response['Access-Control-Allow-Credentials'] = 'true'
          return response
     else:
          response = Response('User is not loggedin', status=status.HTTP_200_OK)
          response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
          response['Access-Control-Allow-Credentials'] = 'true'
          return response