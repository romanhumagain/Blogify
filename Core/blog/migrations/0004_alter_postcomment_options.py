# Generated by Django 4.2.1 on 2024-09-21 14:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_postcomment'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='postcomment',
            options={'ordering': ['-timestamp'], 'verbose_name': 'Post Comment', 'verbose_name_plural': 'Post Comments'},
        ),
    ]
