from rest_framework import serializers
from .models import MyUser, Link, Click

class MyUSerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'country', 'ip_address', 'user_agent']


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'short_link', 'full_link', 'created_by', 'created_at']

class ClickSerializer(serializers.ModelSerializer):
    class Meta:
        model = Click
        fields = ['id', 'link', 'user', 'clicked_at']
