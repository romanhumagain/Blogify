from rest_framework import serializers
from .models import User, OTP, PasswordResetToken

class UserRegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['first_name', 'last_name', 'username', 'email', 'password']
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
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    class Meta:
        model = User
        fields = ['slug','first_name', 'last_name', 'username', 'email', 'password', 'bio', 'is_verified','full_name']
        extra_kwargs = {
                        'password': {'write_only': True}, 
                        'slug' : {'read_only':True}
                        }
        
class UserDetailsSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    class Meta:
        model = User
        fields = ['slug','first_name', 'last_name', 'username', 'email', 'password', 'bio', 'is_verified','full_name', 'profile_pic']
        extra_kwargs = {
                        'password': {'write_only': True}, 
                        'slug' : {'read_only':True}
        }
    
    # def update(self, instance, validated_data):
    #   print("validated data are like ....")
    #   return super().update(instance, validated_data)
        
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