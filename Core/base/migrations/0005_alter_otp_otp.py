# Generated by Django 4.2.1 on 2024-07-09 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_passwordresettoken_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='otp',
            name='otp',
            field=models.CharField(max_length=6, unique=True),
        ),
    ]
