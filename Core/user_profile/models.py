from django.db import models
from base.models import User

class ProfileLinks(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='links', null=True)
    github_link = models.CharField(max_length=255, null=True)
    linkedin_link = models.CharField(max_length=255, null=True)
    personal_website_link = models.CharField(max_length=255, null=True)
    added_on = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self) -> str:
         return f"{self.user.first_name , self.user.last_name}"

class Follow(models.Model):
    
    follower = models.ForeignKey(
        User, 
        related_name='following', 
        on_delete=models.CASCADE
    )
    
    following = models.ForeignKey(
        User, 
        related_name='followers', 
        on_delete=models.CASCADE
    )
    
    followed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following')
        verbose_name = 'Follow'
        verbose_name_plural = 'Follows'

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'



