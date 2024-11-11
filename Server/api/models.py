from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(models.Model):
    country = models.CharField(max_length=100)
    ip_address = models.CharField(max_length=15)
    user_agent = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class Link(models.Model):
    short_link = models.CharField(max_length=50, unique=True)
    full_link = models.URLField()
    created_by = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='links')
    created_at = models.DateTimeField(auto_now_add=True)

class Click(models.Model):
    link = models.ForeignKey(Link, on_delete=models.CASCADE, related_name='clicks')
    user = models.ForeignKey(MyUser, on_delete=models.SET_NULL, null=True, blank=True)
    clicked_at = models.DateTimeField(auto_now_add=True)
