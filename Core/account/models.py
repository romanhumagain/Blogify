from django.db import models
from base.models import User
from blog.models import BlogPost, PostComment

class Notification(models.Model):
    
    CATEGORY_CHOICES = [
        ('follow', 'Follow'),
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('like_comment', 'Like Comment'),
        ('other', 'Other'),  
    ]
    
    actor = models.ForeignKey(User, on_delete = models.CASCADE, related_name='notifications_sent')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="other")
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    
    post = models.ForeignKey(BlogPost, null=True, blank=True, on_delete=models.CASCADE )
    comment = models.ForeignKey(PostComment, null=True, blank=True, on_delete=models.CASCADE  )

    def __str__(self):
        return f"Notification to {self.receiver} - {self.message}"

    class Meta:
        ordering = ['-created_at']