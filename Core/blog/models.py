from typing import Iterable
from django.db import models
from django.contrib.auth import get_user_model
from .utils import genertate_slug

User = get_user_model()

def post_images_upload_to(instance, filename):
  return f'blog_post/{instance.post.title}/{filename}'

class BlogCategory(models.Model):
  category = models.CharField(max_length=200)
  slug = models.SlugField(unique=True)
  
  def save(self, *args, **kwargs):
    self.slug = genertate_slug(BlogCategory, self.category)
    return super(BlogCategory,self).save(*args, **kwargs)
  
  def __str__(self) -> str:
    return self.category

class BlogPost(models.Model):
  author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
  category = models.ForeignKey(BlogCategory,related_name='blog_posts', on_delete=models.CASCADE)
  slug = models.SlugField(unique=True)
  title = models.CharField(max_length=255)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  is_archived = models.BooleanField(default=False)
  
  def save(self, *args, **kwargs):
    self.slug = genertate_slug(BlogPost, self.title)
    return super(BlogPost, self).save(*args, **kwargs)
  
  def __str__(self) -> str:
    return f'{self.title} by {self.author}'
  

class Image(models.Model):
  post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='images')
  image = models.ImageField(upload_to=post_images_upload_to, default='blog_post/post.jpg')
  caption = models.CharField(max_length=200, blank=True, null=True)
  
  def __str__(self) -> str:
    return f'{self.post.title} image'
