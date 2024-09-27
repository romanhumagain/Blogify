from typing import Iterable
from django.db import models
from django.contrib.auth import get_user_model
from .utils import generate_slug

User = get_user_model()

def post_images_upload_to(instance, filename):
  return f'blog_post/{instance.post.category.category}/{filename}'

class BlogCategory(models.Model):
  category = models.CharField(max_length=200, unique=True)
  slug = models.SlugField(unique=True)
  
  def save(self, *args, **kwargs):
    self.slug = generate_slug(BlogCategory, self.category)
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
        if self.title and not self.slug:
            self.slug = generate_slug(BlogPost, self.title)
        super(BlogPost, self).save(*args, **kwargs)
  
  def __str__(self) -> str:
    return f'{self.title} by {self.author}'
  
  class Meta:
    ordering = ['-created_at']
  

class Image(models.Model):
  post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='images')
  image = models.ImageField(upload_to=post_images_upload_to, default='blog_post/post.jpg')
  caption = models.CharField(max_length=200, blank=True, null=True)
  
  def __str__(self) -> str:
    return f'{self.post.title} image'
  
class SavedPost(models.Model):
  slug = models.SlugField(unique=True, blank=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_posts')
  post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='saved_by_user')
  saved_at = models.DateTimeField(auto_now_add=True)
  
  def save(self, *args, **kwargs):
    if not self.pk:
      self.slug = generate_slug(SavedPost, self.post.title)
      super(SavedPost, self).save(*args, **kwargs)
  
  def __str__(self) -> str:
     return self.post.title
   
  class Meta:
    unique_together = ('user', 'post')
    ordering = ['-saved_at']

class LikedPost(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_posts')
  post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='likes')
  timestamp = models.DateTimeField(auto_now_add=True)  

  class Meta:
    unique_together = ('user', 'post')
     
  def __str__(self) -> str:
    return f"Liked by {self.user.full_name} on {self.post.title}"
  
  
class PostComment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commented_posts')
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
      ordering  = ['-timestamp']
      verbose_name = 'Post Comment'
      verbose_name_plural = 'Post Comments'

    def __str__(self) -> str:
        return f"Commented by {self.user.username} on {self.post.title}"
      
    
class LikedComment(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_comments')
  comment = models.ForeignKey(PostComment, on_delete=models.CASCADE, related_name='likes')
  timestamp = models.DateTimeField(auto_now_add=True)  
  
  class Meta:
    unique_together = ('user', 'comment')
     
  def __str__(self) -> str:
    return f"Liked by {self.user.full_name} on comment of id - {self.comment.id}"

  