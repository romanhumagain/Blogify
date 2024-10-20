from rest_framework.serializers import ModelSerializer
from .models import Notification
from rest_framework import serializers
from base.serializers import UserSerializer
from blog.models import BlogPost, LikedComment
from base.models import User
class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['slug', 'full_name', 'username', 'profile_pic']
        
class NotificationSerializer(ModelSerializer):
    post_slug = serializers.SerializerMethodField(read_only = True)
    # comment_id = serializers.SerializerMethodField(read_only = True)
    actor = ActorSerializer()
    
    class Meta:
        model = Notification
        fields = ['actor', 'receiver', 'message', 'category', 'is_read', 'created_at', 'post_slug' ]
        
    def get_post_slug(self, obj):
        if obj.post:
            try:
                post = BlogPost.objects.get(id=obj.post.id)
                return post.slug
            except BlogPost.DoesNotExist:
                return None 
        return None
    
        