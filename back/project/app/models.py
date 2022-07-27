from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    title = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.title


class Product(models.Model):

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    img_url = models.URLField()
    category = models.ManyToManyField(Category)

    def __str__(self):
        return self.title


class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    orderer = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return  str(self.orderer) + ' ' + str(self.product)




