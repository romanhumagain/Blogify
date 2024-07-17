from rest_framework import serializers
from .models import BlogCategory, BlogPost, Image, SavedPost
from base.serializers import UserSerializer

class BlogCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogCategory
    fields = ['id', 'category', 'slug']
    extra_kwargs = {
                  'slug':{'read_only':True}
                  }

class ImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Image
    fields = ['id', 'image', 'caption']

class BlogPostSerializer(serializers.ModelSerializer):
  images = ImageSerializer(many = True, read_only = True)
  category = BlogCategorySerializer(read_only = True)
  author = UserSerializer(read_only = True)
  is_saved = serializers.SerializerMethodField(read_only=True)
  saved_post_slug = serializers.SerializerMethodField(read_only = True)
  
  uploaded_images = serializers.ListField(
      child=serializers.ImageField(allow_empty_file=True, use_url=False),
      write_only=True,
      required=False 
  )
  
  category_slug = serializers.SlugField(write_only = True)
  
  
  class Meta:
    model = BlogPost
    fields = ['id', 'author', 'slug', 'title', 'content', 'created_at', 'updated_at', 'is_archived', 'images', 'category', 'uploaded_images', 'category_slug', 'is_saved', 'saved_post_slug']
    extra_kwargs = {
                    'slug':{'read_only': True},
                    'created_at':{'read_only' : True},
                    'updated_at':{'read_only' : True},
                    }
    
  def create(self, validated_data):
    request = self.context.get('request')
    category_slug = validated_data.pop('category_slug')
    
    category = BlogCategory.objects.get(slug = category_slug)
    
    validated_data['category'] = category
    uploaded_images = validated_data.pop('uploaded_images', [])
    validated_data['author'] = request.user
    blogPost = BlogPost.objects.create(**validated_data)
    
    for image in uploaded_images:
      postImage = Image.objects.create(post = blogPost, image = image)
    
    return blogPost
  
  
  def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            saved_post_exists = SavedPost.objects.filter(user=request.user, post=obj).exists()
            return saved_post_exists
        return False
      
  def get_saved_post_slug(self, obj):
    request = self.context.get('request')
    if request and request.user.is_authenticated:
      saved_post = SavedPost.objects.filter(user = request.user, post = obj).first()
      if saved_post:
        return saved_post.slug
    
    
    
  
class SavedBlogPostSerializer(serializers.ModelSerializer):
  blog_post = BlogPostSerializer(source = 'post', read_only = True)
  
  class Meta:
    model = SavedPost
    fields = ['user', 'post', 'blog_post', 'slug']
    
    extra_kwargs = {
    'slug':{
      'read_only':True
    }
  }
    
