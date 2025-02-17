from rest_framework.serializers import ModelSerializer
from .models import Chat, ChatRoom

class ChatRoomSerializer(ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['participants', 'name']

class ChatSerializer(ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'
        
        
        
    
