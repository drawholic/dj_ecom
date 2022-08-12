from django.core.management.base import BaseCommand, CommandError
from ...models import Category, Product, User
from random import randint


class Command(BaseCommand):
    def handle(self, *args, **options):
        products = Product.objects.all()
        categories = Category.objects.all()
        for product in products:
            product.category.add(categories[randint(0,19)])