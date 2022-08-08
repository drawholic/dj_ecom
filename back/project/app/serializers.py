from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'id')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('title', 'description', 'price', 'owner', 'image', 'id')

    def create(self, validated_data):

        data = {}
        for key in validated_data.keys():
            data[key] = validated_data[key]
        product = Product(**data)
        product.save()
        return product


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('orderer', 'product', 'id')