from django.test import TestCase
from .models import Product, User, Category


class ProductTestCase(TestCase):
    def setUp(self) -> None:
        category = Category.objects.create(title='Category title')
        user = User.objects.create_user(username='user', password='password')
        product = Product.objects.create(owner=user, title='product', description='description', price=20.21, img_url='https://upload.wikimedia.org/wikipedia/commons/6/65/Product_Photography.jpg')
        # product.

    def test_product(self):
        product = Product.objects.get(title='product')
        self.assertIsInstance(product, Product)