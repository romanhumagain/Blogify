# Generated by Django 4.2.1 on 2024-10-19 17:30

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_profile', '0005_recentsearch'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='recentsearch',
            unique_together={('searched_by', 'searched_to')},
        ),
    ]
