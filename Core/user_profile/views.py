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
        # to get the unique slug of the user to whom you are following
        following_user_slug = kwargs.get('slug')
        
        # to check whether the user with that slug exists or not
        try:
            user = User.objects.get(slug = following_user_slug)
        except User.DoesNotExist:
            return Response({'message':'User Doesn\'t exists'}, status=status.HTTP_404_NOT_FOUND)
        
        if Follow.objects.filter(follower = request.user, following = user).exists():
            return Response({'message':'Already following this user!'}, status=status.HTTP_400_BAD_REQUEST)
            
        data = {
            'follower':request.user.id,
            'following':user.id
        }
        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully followed the user."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
        

# ===== to handle the unfollow =======
class UnfollowUserAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'
    
    def delete(self, request, *args, **kwargs):
        follower = request.user
        following_user_slug = kwargs.get('slug')
        try:
            following = User.objects.get(slug=following_user_slug)
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

        serializer = self.get_serializer(data=data) 
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Successfully added to recent searches'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RemoveFromRecentSearchAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    def delete(self, request, *args, **kwargs):
        
        # Get the slug of the user to remove from recent search
        slug = self.kwargs.get('slug')
        try:
            user = User.objects.get(slug = slug)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the recent search exists
        recentSearchedUser = RecentSearch.objects.get(searched_by = request.user, searched_to = user )
        
        if recentSearchedUser:
            recentSearchedUser.delete()
            return Response({"message": "Successfully removed from recent search."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No such search entry found."}, status=status.HTTP_404_NOT_FOUND)
    
    
class ClearAllSearchAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def destroy(self, request, *args, **kwargs):
        # Get all recent searches for the authenticated user
        recentAllSearchedUser = RecentSearch.objects.filter(searched_by=request.user)
        
        if not recentAllSearchedUser.exists():
            return Response({"message": "No recent searches found to delete."}, status=status.HTTP_404_NOT_FOUND)
        
        # Delete the recent searches
        recentAllSearchedUser.delete()
        
        return Response({"message": "Successfully removed all from recent search."}, status=status.HTTP_200_OK)

        
        