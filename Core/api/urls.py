from django.urls import path, include
from base.views import UserRegisterAPIView, UserList, SendOTPAPIView, send_otp_for_registered_user, VerifyOTP, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
  path('register/', UserRegisterAPIView.as_view(), name='register'),
  path('fetch-user/', UserList.as_view(), name='fetch-user'),
  path('send-otp-auth-user/', SendOTPAPIView.as_view(), name='send-otp-auth'),
  path('send-otp-registered-user/', send_otp_for_registered_user, name='send-otp-registered'),
  path('verify-otp/<str:otp>/', VerifyOTP.as_view(), name='verify-otp'),
  path('', include(router.urls)),
  
]