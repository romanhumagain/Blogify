# Generated by Django 4.2.1 on 2024-08-25 14:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profilelinks',
            name='category',
            field=models.CharField(choices=[('website', 'Website'), ('github', 'Github'), ('linkedin', 'LinkedIn')], max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='profilelinks',
            name='link',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='profilelinks',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='links', to=settings.AUTH_USER_MODEL),
        ),
    ]
