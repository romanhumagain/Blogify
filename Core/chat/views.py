from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from .serializers import ChatRoomSerializer, ChatSerializer
from base.models import User
from .models import ChatRoom, Chat


class ListCreateMessages(ListCreateAPIView):
    def create(self, request, *args, **kwargs):
        data = request.data
        sender = request.user
        receiver = User.objects.get(data['receiver'])
    