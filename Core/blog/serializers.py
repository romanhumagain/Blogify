from rest_framework import serializers
from .models import BlogCategory, BlogPost, Image

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
  author = serializers.StringRelatedField(read_only = True)
  
  uploaded_images = serializers.ListField(
    child = serializers.ImageField(allow_empty_file=False, use_url = False), 
    write_only = True
  )
  
  category_slug = serializers.SlugField(write_only = True)
  
  
  class Meta:
    model = BlogPost
    fields = ['id', 'author', 'slug', 'title', 'content', 'created_at', 'updated_at', 'is_archived', 'images', 'category', 'uploaded_images', 'category_slug']
    extra_kwargs = {
                    'slug':{'read_only': True},
                    'created_at':{'read_only' : True},
                    'updated_at':{'read_only' : True},
                    'is_archived':{'read_only': True},
                    }
    
  def create(self, validated_data):
    request = self.context.get('request')
    category_slug = validated_data.pop('category_slug')
    
    category = BlogCategory.objects.get(slug = category_slug)
    
    validated_data['category'] = category
    uploaded_images = validated_data.pop('uploaded_images', [])
    validated_data['author'] = request.user
    blogPost = BlogPost.objects.create(**validated_data)
    print("uploaded images are...", uploaded_images)
    
    for image in uploaded_images:
      postImage = Image.objects.create(post = blogPost, image = image)
    
    print("OK>>>>>>>>>>>>>>>>>>>")
      
    return blogPost