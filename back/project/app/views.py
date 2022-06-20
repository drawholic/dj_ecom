from rest_framework import generics, views,viewsets,  permissions, renderers
from rest_framework.response import Response
from .serializers import UserSerializer, ProductSerializer, OrderSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Product, Order


class MainView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        return Response({"text":"Hello, you are logged!!!"})


class ProductsView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        data = request.data.copy()
        data['owner'] = request.user.pk
        serializer = ProductSerializer(data=data, partial=True)

        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.save()
            return Response({'status':'Success'})
        else:
            return Response(serializer.errors, status=400)


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class RegisterView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User(**serializer.validated_data)
            user.set_password(serializer.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({'token':token.key})
        else:
            return Response({'status':'Error'})


class CartView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = OrderSerializer

    def get(self, request):
        user = request.user
        products = []
        order = user.order_set.all()[0]

        for order in user.order_set.all():
            products.append(Product.objects.get(id=order.product.id))
        print(products)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user = request.user
        product = Product.objects.get(id=request.data['id'])

        order = Order.objects.create(orderer=user, product=product)
        order.save()
        return Response('its all good man')


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get(self, request):

        user = Token.objects.get(key=request.auth).user
        products = user.product_set.all()
        serializer = ProductSerializer(products, many=True)
        context = {
        'username':user.username,
        'lastname':user.last_name,
        'firstname':user.first_name,
        'email':user.email,
        'products':serializer.data}
        return Response(context)

    def put(self, request):
        user = User.objects.get(username=request.user)
        serializer = UserSerializer(user,
                data={
                    'username': request.data['username'],
                    'email': request.data['email'],
                    'first_name': request.data['first_name'],
                    'last_name': request.data['last_name']
                    },
                partial=True
                )
        if serializer.is_valid():
            user = serializer.save()
            user.save()
            return Response({'status':200})
        else:
            return Response({'status':400})















