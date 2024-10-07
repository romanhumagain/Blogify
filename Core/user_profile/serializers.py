from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import (ProfileLinks,
                     Follow, 
                     RecentSearch)
from base.models import User

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
 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['slug','full_name', 'username', 'email', 'bio', 'profile_pic', 'is_verified']
        extra_kwargs = { 
                        'slug' : {'read_only':True}
                        }
           
class RecentSearchSerializer(ModelSerializer):
    searched_user = UserSerializer( source = 'searched_to', read_only = True)
    
    class Meta:
        model = RecentSearch
        fields = ['searched_by', 'searched_to', 'searched_at', 'searched_user'] 
        

        
        
        
        