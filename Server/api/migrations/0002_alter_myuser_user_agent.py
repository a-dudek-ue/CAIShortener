# Generated by Django 5.1.2 on 2024-11-06 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='user_agent',
            field=models.CharField(max_length=100),
        ),
    ]
