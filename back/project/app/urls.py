from django.urls import path
from .views import MainView, RegisterView, ProfileView, ProductsView, ProductDetailView, CartView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
        path('', MainView.as_view()),
        path('token/', obtain_auth_token),
        path('register/', RegisterView.as_view()),
        path('profile/', ProfileView.as_view()),
        path('products/', ProductsView.as_view({'get':'list'})),
        path('products/<str:pk>', ProductDetailView.as_view()),
        path('cart/', CartView.as_view())
        ]
