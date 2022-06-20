from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    img_url = models.URLField()
      
    def __str__(self):
        return self.title


class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    orderer = models.ForeignKey(User, on_delete=models.CASCADE)


