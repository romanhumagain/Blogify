from django.contrib import admin
from .models import (BlogCategory, 
                     BlogPost, 
                     Image, 
                     SavedPost, 
                     LikedPost, 
                     PostComment,
                     LikedComment
                     )

admin.site.register(BlogCategory)
admin.site.register(BlogPost)
admin.site.register(Image)
admin.site.register(SavedPost)
admin.site.register(LikedPost)
admin.site.register(PostComment)
admin.site.register(LikedComment)

