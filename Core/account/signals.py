from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from user_profile.models import Follow
from blog.models import LikedPost
from blog.models import LikedComment
from .models import Notification


@receiver(post_save, sender=Follow)
def send_follow_notification(sender, instance, created, **kwargs):
    if created:
        message = f"{instance.follower.full_name} started following you.";
        Notification.objects.create(actor = instance.follower, receiver = instance.following, category = 'follow',  message= message ) 
        
        
@receiver(post_delete, sender=Follow)
def handle_unfollow_notification(sender, instance, **kwargs):

        notification = Notification.objects.filter(actor = instance.follower, receiver = instance.following, category = 'follow', message__contains = "started following you.")
        
        if notification.exists():
            notification.update(is_deleted = True)

            
@receiver(post_save, sender = LikedPost)
def send_like_post_notification(sender, instance, created, **kwargs):
    if created:
        message = f"{instance.user.full_name} liked your post."        
        Notification.objects.create(actor = instance.user, receiver = instance.post.author, post = instance.post, category = 'like', message = message)
    

@receiver(post_delete, sender = LikedPost)
def handle_unlike_post_notification(sender, instance, **kwargs):      
        notification = Notification.objects.filter(actor = instance.user, receiver = instance.post.author, post = instance.post, category = 'like', message__contains = "liked your post." )
        
        if notification.exists():
            notification.update(is_deleted = True)
    

@receiver(post_save, sender = LikedComment)
def send_like_comment_notification(sender, instance, created, **kwargs):
    if created:
        message = f"{instance.user.full_name} liked your comment."        
        Notification.objects.create(actor = instance.user, receiver = instance.comment.post.author, post = instance.comment.post,  comment = instance.comment, category = 'like_comment', message = message)
    

@receiver(post_delete, sender = LikedComment)
def handle_unlike_comment_notification(sender, instance, **kwargs):      
        notification = Notification.objects.filter(actor = instance.user, receiver = instance.comment.post.author, post = instance.comment.post, comment = instance.comment, category = 'like_comment', message__contains = "liked your comment." )
        
        if notification.exists():
            notification.update(is_deleted = True)