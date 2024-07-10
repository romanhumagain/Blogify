# Generated by Django 4.2.1 on 2024-07-10 17:01

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_rename_images_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='category',
        ),
        migrations.AddField(
            model_name='blogpost',
            name='category',
            field=models.ForeignKey(default=datetime.datetime(2024, 7, 10, 17, 1, 2, 348125, tzinfo=datetime.timezone.utc), on_delete=django.db.models.deletion.CASCADE, related_name='blog_posts', to='blog.blogcategory'),
            preserve_default=False,
        ),
    ]
