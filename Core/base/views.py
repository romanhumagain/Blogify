from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserRegisterSerializer, UserSerializer, OTPSerializer
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .utils import send_email, generate_otp, send_otp_email
from .models import OTP

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
        
        send_otp_email(subject=subject,message=message, to=email)
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
        
        otp_instance.is_expired = True
        otp_instance.save()
        
        return Response({"detail": "User verified successfully."}, status=status.HTTP_200_OK)