from django.urls import path, include
from .views import MainView, RegisterView, ProfileView, ProductsView, ProductDetailView, CartView, DeleteOrderView, \
         CategoryView, ImageHandleView
from rest_framework.authtoken.views import obtain_auth_token
from .models import Category


# category_url = [
#         path(f'{category.title.lower()}', MainView.as_view()) for category in Category.objects.all()
# ]


urlpatterns = [
        # path('', include(category_url)),
        path('image', ImageHandleView.as_view()),
        path('', MainView.as_view()),
        path('products/', ProductsView.as_view({'get': 'list'})),
        path('category/<str:category>', CategoryView.as_view()),
        path('token/', obtain_auth_token),
        path('register/', RegisterView.as_view()),
        path('profile/', ProfileView.as_view()),
        path('products/<str:pk>', ProductDetailView.as_view()),
        path('cart/', CartView.as_view()),
        path('delete-order/', DeleteOrderView.as_view()),
        # path('np/', ProductsNPView.as_view())
        ]
