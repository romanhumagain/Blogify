from django.contrib import admin
from .models import (BlogCategory, 
                     BlogPost, 
                     Image, 
                     SavedPost, 
                     LikedPost, 
                     PostComment
                     )

admin.site.register(BlogCategory)
admin.site.register(BlogPost)
admin.site.register(Image)
admin.site.register(SavedPost)
admin.site.register(LikedPost)
admin.site.register(PostComment)
