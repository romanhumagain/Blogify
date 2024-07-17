from django_filters import rest_framework as filters
from .models import BlogPost, SavedPost


class BlogPostFilter(filters.FilterSet):
  category = filters.CharFilter(field_name='category__category', lookup_expr='iexact' )
  slug = filters.CharFilter(field_name='category__slug', lookup_expr='iexact')
  is_archived = filters.BooleanFilter(field_name='is_archived')
  
  class Meta:
    model =  BlogPost
    fields = ['category', 'slug', 'is_archived']
    
class SavedPostFilter(filters.FilterSet):
  category = filters.CharFilter(field_name='post__category__category', lookup_expr='iexact')
  is_archived = filters.BooleanFilter(field_name='post__is_archived')
  
  class Meta:
    model =  SavedPost
    fields = ['category', 'is_archived']