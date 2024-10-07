from django.contrib import admin
from .models import (ProfileLinks,
                     Follow, 
                     RecentSearch)

admin.site.register(ProfileLinks)
admin.site.register(Follow)
admin.site.register(RecentSearch)


