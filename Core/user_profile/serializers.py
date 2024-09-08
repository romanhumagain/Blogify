from rest_framework.serializers import ModelSerializer
from .models import ProfileLinks

class ProfileLinkSerializer(ModelSerializer):
    class Meta:
        model = ProfileLinks
        fields = '__all__'