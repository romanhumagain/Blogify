from django.db import models
from base.models import User

class ProfileLinks(models.Model):
    CategoryChoices = [
        ('website', 'Website'),
        ('github', 'Github'),
        ('linkedin', 'LinkedIn'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='links', null=True)
    category = models.CharField(max_length=100, choices=CategoryChoices, null=True)
    link = models.CharField(max_length=255, null=True)
    added_on = models.DateTimeField(auto_now_add=True, null=True)
    
    class Meta:
        unique_together = ('category', 'link')
        
    def __str__(self) -> str:
         return f"{self.user.first_name , self.user.last_name}'s {self.get_category_display()} link" 

