from django.contrib import admin
from .models import BlogCategory, BlogPost, Image

admin.site.register(BlogCategory)
admin.site.register(BlogPost)
admin.site.register(Image)