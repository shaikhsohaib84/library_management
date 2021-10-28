from django.db import models
from django.db.models import fields
from django.contrib.auth import authenticate
from django.db.models.base import Model

from rest_framework import serializers, validators
from .models import Admin, Book
from passlib.hash import pbkdf2_sha256

class AdminSignUpSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        admin = Admin.objects.create(
            name = validated_data.pop('name'),
            email = validated_data.pop('email'),
            password=pbkdf2_sha256.hash(validated_data.pop('password'))
        )
        return admin
    
    class Meta:
        model = Admin
        fields = '__all__'
        # fields = ['id', 'name', 'email', 'password']


class AdminLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        model = Admin
        fields = ['email', 'password']
        

class AddNewBookSerializer(serializers.ModelSerializer):
    class Meta:
        model=Book
        fields = '__all__'


class UpdateBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['book_name', 'book_author_name', 'book_price', 'book_type']
