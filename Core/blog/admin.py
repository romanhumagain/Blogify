from django.contrib import admin
from .models import BlogCategory, BlogPost, Image, SavedPost

admin.site.register(BlogCategory)
admin.site.register(BlogPost)
admin.site.register(Image)
admin.site.register(SavedPost)
