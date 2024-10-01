from rest_framework.serializers import ModelSerializer
from .models import (ProfileLinks,
                     Follow)

class ProfileLinkSerializer(ModelSerializer):
    class Meta:
        model = ProfileLinks
        fields = '__all__'
        
class FollowSerializer(ModelSerializer):
    class Meta:
        model= Follow
        fields = ['following', 'follower', 'followed_at'] 
        
        extra_kwargs = {
            'followed_at':{'read_only':True}
        }
        
        