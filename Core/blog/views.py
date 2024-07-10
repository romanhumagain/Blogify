from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .serializers import BlogPostSerializer, BlogCategorySerializer
from .models import BlogPost, BlogCategory
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAuthenticated


class CategoryViewSet(viewsets.ModelViewSet):
  queryset = BlogCategory.objects.all()
  serializer_class = BlogCategorySerializer
  permission_classes = [AllowAny]
  lookup_field = 'slug'
  lookup_url_kwarg='slug'
  

class BlogPostViewSet(viewsets.ModelViewSet):
  queryset = BlogPost.objects.all()
  serializer_class = BlogPostSerializer
  permission_classes = [IsAuthenticated]
  lookup_field = 'slug'
  lookup_url_kwarg = 'slug'
  
  filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
  filterset_fields = ['category']
  search_fields  = ['title', 'content']
  ordering_fields = ['created_at']