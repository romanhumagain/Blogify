from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import (UserRegisterSerializer, 
                          UserSerializer, 
                          OTPSerializer, 
                          PasswordResetTokenSerializer,
                          PasswordResetSerializer,
                          VerifyOTPSerializer)
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .utils import send_email, generate_otp, send_otp_token_email, generate_password_reset_token
from .models import OTP, PasswordResetToken
from django.utils import timezone
from datetime import timedelta
from django.db import transaction

from rest_framework import viewsets

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.get_full_name
        token['username'] = user.username
        token['is_verified'] = user.is_verified
        token['email'] = user.email

        return token
      
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer
  
def send_email_afer_registration(name, to_email):
    message = f"""<p>Hi {name},</p>

                <p>Thank you for registering at Blogify! We're thrilled to have you as part of our community.</p>

                <p>At Blogify, you can share your thoughts, follow interesting authors, and stay updated with the latest trends. To get started, log in to your account and explore all the features we have to offer.</p>

                <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:blogify.connect@gmail.com">blogify.connect@gmail.com</a>.</p>

                <p>Happy blogging!</p><br>
                <a href="http://localhost:5173/">Visit Site</a>

                <p>Best regards,<br>
                The Blogify Team</p>
                """
    subject = "Welcome to Blogify! 🌟"
    to = to_email
    send_email(subject=subject, message=message, to=to)
  
  
class UserRegisterAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        serializer = UserRegisterSerializer(data=data)
        try:
            if serializer.is_valid():
                user = serializer.save()
                send_email_afer_registration(user.get_full_name, user.email)
                return Response({
                    'message': 'Successfully registered your account.',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
          
          
class UserList(ListAPIView):
    
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = User.objects.all()
        email = self.request.query_params.get('email')
        
        if email is not None:
            queryset = queryset.filter(email=email)
            
        return queryset
    
    
def send_email_for_otp(user):
    otp_code = generate_otp(user)
    
    if otp_code is not None: 
        message = f"""
                    <p>Hi {user.get_full_name},</p>
                    <p> Thank you for registering. Please use the following OTP to complete your verification: </p>
                    <h2>{otp_code}</h2>
                    
                    <p></p>
                    <p>Best regards,<br>
                    The Blogify Team</p>
            """
        subject = "OTP Verification🔒"
        email = user.email
        
        send_otp_token_email(subject=subject,message=message, to=email)
        return True
    
    return False
    
    
class SendOTPAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            user = request.user
            if user is not None:
                email_sent = send_email_for_otp(user)
                if email_sent:
                    return Response({'message': 'Successfully sent email.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Failed to send OTP email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'message': 'User not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(f"Error in sending OTP: {str(e)}")
            return Response({'message': 'Internal server error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                

@api_view(['GET'])
@permission_classes([AllowAny])
def send_otp_for_registered_user(request):
    email = request.query_params.get('email', None)
    if email is not None:
        user = User.objects.filter(email = email).first()
        email_sent = send_email_for_otp(user)
        if email_sent:
            return Response({'message': 'Successfully sent email.'}, status=status.HTTP_200_OK)
        return Response({'message': 'Failed to send OTP email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class VerifyOTP(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OTPSerializer
    lookup_field='otp'
    
    def get_queryset(self):
        user = self.request.user
        otp = self.kwargs['otp']
        return OTP.objects.filter(user=user, otp=otp)
    
    def update(self, request, *args, **kwargs):
        otp_instance = self.get_queryset().first()
        
        if not otp_instance:
            return Response({'detail': 'OTP not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if otp_instance.has_expired or otp_instance.is_expired:
            return Response({"detail": "OTP has expired."}, status=status.HTTP_400_BAD_REQUEST)
        
        otp_instance.user.is_verified = True
        otp_instance.user.save()
        
        otp_instance.delete()
        
        return Response({"detail": "User verified successfully."}, status=status.HTTP_200_OK)
    
class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    
def send_password_reset_token_email(user):
    token  = generate_password_reset_token(user)
    reset_link = f"http://localhost:5173/password-reset/{token}"
    expiration_time = timezone.now() + timedelta(minutes=5)
    
    if token is not None: 
        subject = 'Password Reset Request'
        message = (
            f'<p>Hello {user.get_full_name},</p>'
            '<p>You have requested a password reset. Please click on the link below to reset your password:</p>'
            f'<p>{reset_link}</p>'
            '<p>This link will expire in 5 minutes.</p>'
            '<p>If you did not request this reset, please ignore this email.</p>'
            '<p>Thank you!'
        )
        email = user.email
        
        send_otp_token_email(subject=subject,message=message, to=email)
        return True
    
    return False

class PasswordResetAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            data = request.data
            
            try:
                user = User.objects.get(email = data['email'])
            except User.DoesNotExist:
                 return Response({'detail': 'Email not found ! Please use your registered email address.'}, status=status.HTTP_404_NOT_FOUND)
                
            email_sent = send_password_reset_token_email(user)
            if email_sent:
                return Response({'detail': 'Successfully sent email.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Failed to send password reset email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except Exception as e:
            print(f"Error in sending Password Reset Token: {str(e)}")
            return Response({'detail': 'Internal server error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class VerifyPasswordResetTokenAPIView(RetrieveAPIView):
    serializer_class = PasswordResetTokenSerializer
    permission_classes = [AllowAny]
    lookup_field = 'token'
    lookup_url_kwarg = 'token'

    def get(self, request, *args, **kwargs):
        token = self.kwargs.get(self.lookup_url_kwarg)
        try:
            token_instance = PasswordResetToken.objects.get(token=token)
            if token_instance.is_expired:
                return Response({'detail': 'Token Expired, Resend new token!'}, status=status.HTTP_404_NOT_FOUND)
            return Response({'detail': 'Token verified!'}, status=status.HTTP_200_OK)
        except PasswordResetToken.DoesNotExist:
            return Response({'detail': 'Invalid Token!'}, status=status.HTTP_400_BAD_REQUEST)
           
class ConfirmPasswordResetAPIView(UpdateAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = [AllowAny]
    
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            try:
                print(data['token'])
                token = PasswordResetToken.objects.get(token=data['token'])
                if not token.is_expired:
                    with transaction.atomic():
                        user = token.user
                        user.set_password(data['password'])
                        user.save()
                        token.delete()
                        send_email("Password Reset Successfull ",
                                   """
                                   <p>Your password has been successfully changed !</p>
                                   <p>If you did not initiate this request, please contact our support team immediately</p>
                                   <p>Thank you for being a valued user.</p>
                                   <p>Best regards,</p>
                                   <p><strong>Blogify</strong></p>
                                   """,
                                   user.email)

                        return Response({'detail': 'Successfully changed password!'}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Token already expired!'}, status=status.HTTP_400_BAD_REQUEST)
            except PasswordResetToken.DoesNotExist:
                return Response({'detail': "Token doesn't exist!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            
class VerifyRegisteredUserOTP(UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = VerifyOTPSerializer
    
    def update(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        
        if serializer.is_valid():
            data = serializer.validated_data
            try:
                otp = OTP.objects.get(otp=data['otp'])
                
                if not otp.has_expired:
                    with transaction.atomic():
                        user = otp.user
                        user.is_verified = True
                        user.save()
                        otp.delete()

                    return Response({'detail': 'Successfully verified your account!'}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'OTP already expired!'}, status=status.HTTP_400_BAD_REQUEST)
            except OTP.DoesNotExist:
                return Response({'detail': "OTP doesn't exist!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
