from django.db import models
from base.models import User

class Notification(models.Model):
    actor = models.ForeignKey(User, on_delete = models.CASCADE, related_name='notifications_sent')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification to {self.recipient} - {self.message}"

    class Meta:
        ordering = ['-created_at']