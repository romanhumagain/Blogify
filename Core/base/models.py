from typing import Iterable
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .manager import UserManager
from django.utils import timezone
from datetime import timedelta
from blog.utils import generate_slug

# function to handle the image upload
def profile_pic_upload_to(instance, filename):
    return f'profile/{instance.username}/{filename}'

class User(AbstractBaseUser, PermissionsMixin):
    slug = models.SlugField(unique=True)
    email = models.EmailField(unique=True, verbose_name=_("Email Address"))
    username = models.CharField(max_length=100, unique=True, verbose_name=_("Username"))
    full_name = models.CharField(max_length=100, verbose_name=_("Full Name"))
    password = models.CharField(max_length=100, verbose_name=_("Password"))
    
    profile_pic = models.ImageField(upload_to=profile_pic_upload_to, default='profile/default_profile_pic.webp')
    bio = models.TextField(null=True, blank=True)
    
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    objects = UserManager()
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.slug = generate_slug(User, self.username)
        return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.email
    
class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='otp')
    otp = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_expired = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        # expires all previous OTP's for the user
        OTP.objects.filter(user = self.user, is_expired=False).update(is_expired=True,expires_at=timezone.now()  )
        
        # Call the real save() method
        super(OTP, self).save(*args, **kwargs)
        
    @property
    def has_expired(self):
        return timezone.now() > self.expires_at
    
    def __str__(self):
        return f"OTP for {self.user.username} - {self.otp}"
    
    
class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='token')
    token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    token_expired = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        PasswordResetToken.objects.filter(user= self.user, token_expired=False).update(token_expired=True, expires_at= timezone.now() )
        super(PasswordResetToken, self).save(*args, **kwargs)
        
    @property
    def is_expired(self):
        return timezone.now() > self.expires_at
    
    def __str__(self) -> str:
        return self.token
