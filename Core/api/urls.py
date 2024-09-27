from django.urls import path, include

from base.views import (
    UserRegisterAPIView,
    UserList,
    SendOTPAPIView,
    send_otp_for_registered_user,
    VerifyOTP,
    UserViewSet,
    PasswordResetAPIView,
    VerifyPasswordResetTokenAPIView,
    ConfirmPasswordResetAPIView,
    VerifyRegisteredUserOTP,
    UserDetailsViewSets
)

from blog.views import (
    BlogPostViewSet,
    CategoryViewSet,
    UserBlogPostViewSet,
    SavedPostViewSet,
    UserBlogPostDetails,
    LikePostAPIView, 
    UnlikePostAPIView, 
    ListCreateCommentAPIView,
    UpdateDeleteCommentAPIView,
    LikeCommentAPIView,
    UnlikeCommentAPIView
    
)

# from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register(r"user", UserViewSet, basename="user")
router.register(r"user-details", UserDetailsViewSets, basename="user-details")


# endpoints for the blog app
router.register("blog", BlogPostViewSet, basename="blog")
router.register("blog-category", CategoryViewSet, basename="blog-category")

router.register(r"user-blog", UserBlogPostViewSet, basename="user-blog")

# user_blog_router = routers.NestedDefaultRouter('router', r'user-blog', lookup = 'slug')
# user_blog_router.register(r'saved-post', SavedPostViewSet, basename='saved_post')


router.register("saved-post", SavedPostViewSet, basename="saved-post")


urlpatterns = [
    path("register/", UserRegisterAPIView.as_view(), name="register"),
    path("fetch-user/", UserList.as_view(), name="fetch-user"),
    path("send-otp-auth-user/", SendOTPAPIView.as_view(), name="send-otp-auth"),
    path("send-otp-registered-user/", send_otp_for_registered_user, name="send-otp-registered",),
    path("verify-otp/<str:otp>/", VerifyOTP.as_view(), name="verify-otp"),
    path("", include(router.urls)),
    path("password-reset/", PasswordResetAPIView.as_view(), name="password-reset"),
    path("verify-password-reset-token/<str:token>/", VerifyPasswordResetTokenAPIView.as_view(), name="verify-password-reset-token",),
    path("confirm-password-reset/", ConfirmPasswordResetAPIView.as_view(), name="confirm-password-reset",),
    path("verify-registered-user-otp/", VerifyRegisteredUserOTP.as_view(), name="verify-registered-user-otp",),
    
    path('user-blogposts/<str:slug>/', UserBlogPostDetails.as_view(),name='user_blogposts'),
    path('like-post/<str:blog_post_slug>/', LikePostAPIView.as_view(), name='like-post'),
    path('unlike-post/<str:blog_post_slug>/', UnlikePostAPIView.as_view(), name='unlike-post'),
    
    path('comments/post/<str:slug>/', ListCreateCommentAPIView.as_view(), name='list-create-comment'),
    path('comments/<int:id>/', UpdateDeleteCommentAPIView.as_view(), name='update-delete-comment'),
    path('like-comment/<int:comment_id>/', LikeCommentAPIView.as_view(), name='like-comment'),
    path('unlike-comment/<int:comment_id>/', UnlikeCommentAPIView.as_view(), name='unlike-comment'),
    
]
