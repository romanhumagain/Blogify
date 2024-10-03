from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import (FollowSerializer,
                          RecentSearchSerializer)
from .models import (Follow,
                     RecentSearch)
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
     
#  ==== to add the recent searched ======
class RecentSearchAPIView(generics.ListCreateAPIView):
    serializer_class = RecentSearchSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Fetch the recent searches made by the user
        recentSearchedUsers = RecentSearch.objects.filter(searched_by=request.user)
        serializer = self.get_serializer(recentSearchedUsers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = request.data

        # to get the slug of the searched user
        user_slug = data.get('slug')
        
        try:
            user = User.objects.get(slug=user_slug)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the recent search already exists and delete it
        recentSearchedUser = RecentSearch.objects.filter(searched_by=request.user, searched_to=user)
        if recentSearchedUser.exists():
            recentSearchedUser.delete()
        
        # Create a new recent search entry
        data = {
            'searched_by': request.user.id,
            'searched_to': user.id
        }

        serializer = self.get_serializer(data=data)  # Pass `data` to the serializer
        if serializer.is_valid():  # Use parentheses
            serializer.save()
            return Response({'message': 'Successfully added to recent searches'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RemoveFromRecentSearchAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        data = request.data
        
        # Get the slug of the user to remove from recent search
        user_slug = data.get('slug')
        
        try:
            user = User.objects.get(slug=user_slug)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the recent search exists
        recentSearchedUser = RecentSearch.objects.filter(searched_by=request.user, searched_to=user).first()
        
        if recentSearchedUser:
            recentSearchedUser.delete()
            return Response({"message": "Successfully removed from recent search."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "No such search entry found."}, status=status.HTTP_404_NOT_FOUND)
    
        
        
        