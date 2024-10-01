from django.contrib import admin
from .models import (ProfileLinks,
                     Follow)

admin.site.register(ProfileLinks)
admin.site.register(Follow)

