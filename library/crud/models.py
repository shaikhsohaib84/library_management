from django.db import models
# from django.contrib.auth.models import AbstractUser

from crud.choices import BOOK_TYPE_CHOICES
# Create your models here.

'''
from passlib.hash import pbkdf2_sha256
hash = pbkdf2_sha256.hash("toomanysecrets")
'''
class Admin(models.Model):
    id = models.AutoField(blank=False, null=False, primary_key=True)
    name = models.CharField(max_length=20, blank=False, null=False)
    email = models.EmailField(max_length=254, blank=False, null=False, unique=True)
    password = models.TextField(max_length=255, blank=False, null=False) 
    
    class Meta:
        db_table = 'Admin'

    def __str__(self):
        return self.email
    

class Book(models.Model):
    id = models.AutoField(blank=False, null=False, primary_key=True)
    book_name = models.CharField(max_length=50, blank=False, null=False)
    book_author_name = models.CharField(max_length=50, blank=False, null=False)
    book_price = models.IntegerField(blank=False, null=False)
    book_type = models.CharField(max_length=50, blank=False, null=False, default=1, choices=BOOK_TYPE_CHOICES)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    class Meta:
        db_table = 'Book'

    def __str__(self):
        return self.book_name
