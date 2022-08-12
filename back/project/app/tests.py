from django.test import TestCase
from .models import Product, User, Category


class ProductTestCase(TestCase):
    def setUp(self) -> None:
        category = Category.objects.create(title='Test category')
        user = User.objects.create_user(username='testuser', password='testpass')
        product = Product.objects.create(owner=user, title='Test product', description='Test description', price=20.21)
        product.category.add(category)

    def test_product(self):
        product = Product.objects.get(title='Test product')
        self.assertEqual(product.title, 'Test product')
        self.assertEqual(product.description, 'Test description')
        self.assertEqual(product.price, 20.21)
        self.assertIsInstance(product, Product)
        self.assertIsInstance(product.owner, User)
        self.assertIsInstance(product.category.first(), Category)