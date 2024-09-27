from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .serializers import (BlogPostSerializer, 
                          BlogCategorySerializer, 
                          SavedBlogPostSerializer, 
                          LikedPostSerializer, 
                          PostCommentSerializer, 
                          LikedCommentSerializer)

from .models import (BlogPost, 
                     BlogCategory, 
                     SavedPost, 
                     LikedPost, 
                     PostComment,
                     LikedComment)

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAuthenticated
from .filters import BlogPostFilter, SavedPostFilter
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from .pagination import BlogPostPagination
from base.models import User
from rest_framework.exceptions import NotFound
from rest_framework import generics


class CategoryViewSet(viewsets.ModelViewSet):
  queryset = BlogCategory.objects.all()
  serializer_class = BlogCategorySerializer
  permission_classes = [AllowAny]
  lookup_field = 'slug'
  lookup_url_kwarg='slug'
  

# ==== to get the blog post list of all user ====
class BlogPostViewSet(viewsets.ModelViewSet):
  queryset = BlogPost.objects.all()
  serializer_class = BlogPostSerializer
  permission_classes = [IsAuthenticated]
  lookup_field = 'slug'
  lookup_url_kwarg = 'slug'
  pagination_class = LimitOffsetPagination
  filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
  filterset_class = BlogPostFilter
  search_fields  = ['title', 'content']
  ordering_fields = ['-created_at']
  
  def get_queryset(self):
    queryset = self.queryset.filter(is_archived = False)
    return queryset
  
  def get_object(self, *args, **kwargs):
      slug = self.kwargs.get('slug')
      return get_object_or_404(BlogPost, slug=slug)
    
  def get_serializer_context(self):
     return {'request':self.request}

    
# ==== to get the authenticated user post list of a certain user
class UserBlogPostViewSet(viewsets.ModelViewSet):
  
  serializer_class = BlogPostSerializer
  permission_classes = [IsAuthenticated]
  lookup_field = 'slug'
  lookup_url_kwarg = 'slug'

  filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
  filterset_class = BlogPostFilter
  search_fields = ['title', 'content']
  ordering_fields  = ['-created_at']
  ordering = ['-created_at']
  
  def get_queryset(self):
    user = self.request.user
    queryset = BlogPost.objects.filter(author = user)
    
    return queryset
  
  # def get_serializer_context(self):
  #    return {'request':self.request}


# To get the user post list for the profile
class UserBlogPostDetails(generics.ListAPIView):
  serializer_class = BlogPostSerializer
  permission_classes = [IsAuthenticated]
  lookup_field = 'slug'
  lookup_url_kwarg = 'slug'
  
  filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
  filterset_class = BlogPostFilter
  search_fields = ['title', 'content']
  ordering_fields  = ['-created_at']
  ordering = ['-created_at']
  
  
  def get_queryset(self):
    slug = self.kwargs.get('slug')
    
    user = User.objects.get(slug = slug)

    queryset = BlogPost.objects.filter(author = user)
    print(queryset)
    return queryset
  
  # def get_serializer_context(self):
  #    return {'request':self.request}
    
  
# ==== to get the saved post list ====
class SavedPostViewSet(viewsets.ModelViewSet):
    serializer_class = SavedBlogPostSerializer
    permission_classes = [IsAuthenticated]
    
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = SavedPostFilter
    search_fields = ['post__title','post__content']
    
    
    def get_queryset(self):
        user = self.request.user
        savedPost = SavedPost.objects.filter(user=user)
        return savedPost
    
    def create(self, request, *args, **kwargs):
        user = self.request.user
        
        try:
            blogPost = BlogPost.objects.get(slug = request.data['post'])
              
        except BlogPost.DoesNotExist:
            return Response({'detail': 'Blog post not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        data = {
          'user':user.id,
          'post':blogPost.id
        }
        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class LikePostAPIView(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = LikedPostSerializer
  lookup_field = 'blog_post_slug'
  lookup_url_kwarg = 'blog_post_slug'
  
  def create(self, request, *args, **kwargs):
    user = request.user
    slug = kwargs.get('blog_post_slug')
    
    try:
      post = BlogPost.objects.get(slug = slug)
    except BlogPost.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
    
    data = {
            'user':user.id,
            'post':post.id
            }
    
    serializer = self.get_serializer(data = data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class UnlikePostAPIView(generics.DestroyAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = LikedPostSerializer
  lookup_field = 'blog_post_slug'
  lookup_url_kwarg = 'blog_post_slug'
  
  def destroy(self, request, *args, **kwargs):
    slug = kwargs.get('blog_post_slug')
    try:
      post = BlogPost.objects.get(slug = slug)
    except BlogPost.DoesNotExist:
      return Response({"error":'Post not found'}, status= status.HTTP_404_NOT_FOUND)
    
    try:
      likedPost = LikedPost.objects.get(post = post, user = request.user)
    except LikedPost.DoesNotExist:
      return Response({"error":'You have not liked this post'}, status= status.HTTP_404_NOT_FOUND)
      
    likedPost.delete()
    return Response({'message': 'Successfully unliked the post'}, status=status.HTTP_200_OK)
    
    
# to create a comment
class ListCreateCommentAPIView(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = PostCommentSerializer
  lookup_field = 'slug'
  lookup_url_kwarg = 'slug'
  
  def list(self, request, *args, **kwargs):
    slug = kwargs.get('slug')
    try:
        post = BlogPost.objects.get(slug=slug)
    except BlogPost.DoesNotExist:
        return Response({'error': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    post_comments = PostComment.objects.filter(post=post)

    serializer = self.get_serializer(post_comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
    
  def create(self, request, *args, **kwargs):
    slug = kwargs.get('slug')
    data = request.data
    
    post = BlogPost.objects.get(slug = slug)
    data['post'] = post.pk
    data['user'] = request.user.pk
    
    serializer = self.get_serializer(data = data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
  def get_serializer_context(self):
     return {'request':self.request}
         
# ====== API view to handle the fetching comment, updating comment and deleting comment =========
class UpdateDeleteCommentAPIView(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = PostCommentSerializer
  lookup_field = 'id'
  lookup_url_kwarg = 'id'
  
  # to handle the update comment
  def update(self, request, *args, **kwargs):
    id = kwargs.get('id')
    user = request.user
    
    try:
      comment = PostComment.objects.get(id = id, user = user)
    except PostComment.DoesNotExist:
      return Response({'message':'No such comments found !'}, status=status.HTTP_400_BAD_REQUEST)
      
    data = request.data
    
    serializer = self.get_serializer(comment, data=data, partial = True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
   
  # to handel the delete comment
  def destroy(self, request, *args, **kwargs):
    id = kwargs.get('id')
    
    try:
      comment = PostComment.objects.get(id = id)
    except PostComment.DoesNotExist:
      return Response({'message':'No such comments found to delete !'}, status=status.HTTP_400_BAD_REQUEST)
    
    comment.delete()
    return Response({'message': 'Successfully deleted comment'}, status=status.HTTP_200_OK)
    
    
# ===== for liking and unliking the comments
class LikeCommentAPIView(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = LikedCommentSerializer
  lookup_field = 'comment_id'
  lookup_url_kwarg = 'comment_id'
  
  def create(self, request, *args, **kwargs):
    user = request.user
    id = kwargs.get('comment_id')
    
    try:
      comment =PostComment.objects.get(id = id)
    except PostComment.DoesNotExist:
        return Response({"error": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)
    
    data = {
            'user':user.id,
            'comment':comment.id
            }
    
    serializer = self.get_serializer(data = data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class UnlikeCommentAPIView(generics.DestroyAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = LikedCommentSerializer
  lookup_field = 'comment_id'
  lookup_url_kwarg = 'comment_id'
  
  def destroy(self, request, *args, **kwargs):
    id = kwargs.get('comment_id')
    try:
       comment =PostComment.objects.get(id = id)
    except PostComment.DoesNotExist:
      return Response({"error":'Comment not found'}, status= status.HTTP_404_NOT_FOUND)
    
    try:
      likedComment = LikedComment.objects.get(comment = comment, user = request.user)
    except LikedComment.DoesNotExist:
      return Response({"error":'You have not liked this comment'}, status= status.HTTP_404_NOT_FOUND)
      
    likedComment.delete()
    return Response({'message': 'Successfully unliked comment'}, status=status.HTTP_200_OK)
    