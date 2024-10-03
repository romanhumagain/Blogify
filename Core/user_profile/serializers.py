from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import (ProfileLinks,
                     Follow, 
                     RecentSearch)

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
        
class RecentSearchSerializer(ModelSerializer):
    searched_to = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = RecentSearch
        fields = ['searched_by', 'searched_to', 'searched_at'] 
        extra_kwargs = {
            'searched_by': {'read_only': True},  
            'searched_at': {'read_only': True} 
        }

        
        
        
        