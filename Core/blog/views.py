from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .serializers import BlogPostSerializer, BlogCategorySerializer, SavedBlogPostSerializer
from .models import BlogPost, BlogCategory, SavedPost
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAuthenticated
from .filters import BlogPostFilter, SavedPostFilter
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from .pagination import BlogPostPagination



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
  OrderingFilter = ['created_at']
  
  
  def get_queryset(self):
    user = self.request.user
    blogPost = BlogPost.objects.filter(author = user)
    return blogPost
  
  def get_serializer_context(self):
     return {'request':self.request}
  
  
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
      
