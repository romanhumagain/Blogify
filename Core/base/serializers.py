from rest_framework import serializers
from .models import User, OTP, PasswordResetToken
from user_profile.serializers import ProfileLinkSerializer
from user_profile.models import ProfileLinks

class UserRegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['full_name', 'username', 'email', 'password']
    extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }
    
  def validate_email(self, value):
    if User.objects.filter(email = value).exists():
      raise serializers.ValidationError("Email is already registered !")
    return value
    
  def create(self, validated_data):
    password = validated_data.pop('password', None)
    user = User.objects.create(**validated_data)
    if password is not None:
      user.set_password(password)
    user.save()
    return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['slug','full_name', 'username', 'email', 'password', 'bio', 'profile_pic', 'is_verified']
        extra_kwargs = {
                        'password': {'write_only': True}, 
                        'slug' : {'read_only':True}
                        }
        
class UserDetailsSerializer(serializers.ModelSerializer):
    profile_links = ProfileLinkSerializer(source='links', read_only=True)
    
    github_link = serializers.CharField(required=False, allow_blank=True)
    linkedin_link = serializers.CharField(required=False, allow_blank=True)
    personal_website_link = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['slug', 'full_name', 'username', 'email', 'password', 'bio', 'is_verified', 'profile_pic', 'github_link', 'linkedin_link', 'personal_website_link', 'profile_links']
        extra_kwargs = {
            'password': {'write_only': True}, 
            'slug': {'read_only': True}
        }
        
    def update(self, instance, validated_data):
      instance.full_name = validated_data.get('full_name', instance.full_name)
      instance.username = validated_data.get('username', instance.username)
      instance.bio = validated_data.get('bio', instance.bio)
      instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
      instance.save()
      
      
      # Update ProfileLinks fields
      github_link = validated_data.get('github_link', None)
      linkedin_link = validated_data.get('linkedin_link', None)
      personal_website_link = validated_data.get('personal_website_link', None)
      
      profile_links, created = ProfileLinks.objects.get_or_create(user=instance)
      if github_link is not None:
          profile_links.github_link = github_link
      if linkedin_link is not None:
          profile_links.linkedin_link = linkedin_link
      if personal_website_link is not None:
          profile_links.personal_website_link = personal_website_link
      
      profile_links.save()
      
      return instance

  

class OTPSerializer(serializers.ModelSerializer):
  class Meta:
    model = OTP
    fields =['otp']
    
class PasswordResetTokenSerializer(serializers.ModelSerializer):
  class Meta:
    model = OTP
    fields = ['token', 'token_expired']
    
    
class PasswordResetSerializer(serializers.Serializer):
  token = serializers.CharField(max_length = 100)
  password = serializers.CharField(write_only = True)
  
class VerifyOTPSerializer(serializers.Serializer):
  otp = serializers.CharField(max_length=6)