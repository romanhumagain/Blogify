from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import (FollowSerializer, )
from .models import (Follow, )
from rest_framework import status
from base.models import User

# ===== to handle the follow ======
class FollowUserAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowSerializer
    
    def post(self, request, *args, **kwargs):
        data = request.data
        
        # to get the unique slug of the user to whom you are following
        following_user_slug = data.slug
        
        # to check whether the user with that slug exists or not
        try:
            user = User.objects.get(slug = following_user_slug)
        except User.DoesNotExist:
            return Response({'message':'User Doesn\'t exists'}, status=status.HTTP_404_NOT_FOUND)
        
        if Follow.objects.filter(follower = request.user, following = user).exists:
            return Response({'message':'Already following this user!'}, status=status.HTTP_400_BAD_REQUEST)
            
        Follow.objects.create(follower = request.user, following = user)
        return Response({"message": "Successfully followed the user."}, status=status.HTTP_201_CREATED)
        
# ===== to handle the unfollow =======
class UnfollowUserAPIView(generics.DestroyAPIView):
    def delete(self, request, *args, **kwargs):
        follower = request.user
        following_id = kwargs.get('id')
        try:
            following = User.objects.get(id=following_id)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        follow_relation = Follow.objects.filter(follower=follower, following=following)
        if not follow_relation.exists():
            return Response({"message": "You are not following this user."}, status=status.HTTP_400_BAD_REQUEST)

        follow_relation.delete()
        return Response({"message": "Successfully unfollowed the user."}, status=status.HTTP_204_NO_CONTENT)