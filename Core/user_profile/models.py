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

