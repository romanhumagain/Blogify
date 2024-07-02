from rest_framework import serializers
from .models import User, OTP

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
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password','is_verified']
        extra_kwargs = {'password': {'write_only': True}}

class OTPSerializer(serializers.ModelSerializer):
  class Meta:
    model = OTP
    fields =['otp']