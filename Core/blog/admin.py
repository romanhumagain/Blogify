from django.contrib import admin
from .models import BlogCategory, BlogPost, Image, SavedPost, LikedPost

admin.site.register(BlogCategory)
admin.site.register(BlogPost)
admin.site.register(Image)
admin.site.register(SavedPost)
admin.site.register(LikedPost)
