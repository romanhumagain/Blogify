from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from .serializers import NotificationSerializer
from .models import Notification

class NotificationListAPIView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
        
    def get_queryset(self):
        return self.queryset.filter(receiver = self.request.user)