from django.core.mail import EmailMultiAlternatives
from django.conf import settings
import pyotp
from django.utils import timezone
from datetime import timedelta
from .models import OTP


def send_email(subject, message, to):
    email = EmailMultiAlternatives(
        subject=subject,
        body=message,
        to=[to],
        from_email=settings.EMAIL_HOST_USER
    )
    email.content_subtype = 'html' 
    email.send()
    
def generate_otp(user):
    try:
        totp = pyotp.TOTP(pyotp.random_base32(), interval=300)
        otp = totp.now()
        expires_at = timezone.now() + timedelta(minutes=5)
        
        otpInstance = OTP.objects.create(user=user, otp=otp, expires_at=expires_at)
        return otp
    except Exception as err:
        return None

def send_otp_email(subject, message, to):
    try:
        email = EmailMultiAlternatives(
        subject=subject,
        body=message,
        to=[to],
        from_email=settings.EMAIL_HOST_USER
        )
        email.content_subtype = 'html' 
        email.send()
        return True
    
    except Exception as err:
        print(err)
        return False
    