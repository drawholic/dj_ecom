from rest_framework import generics, views, viewsets, permissions
from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import UserSerializer, ProductSerializer, OrderSerializer, CategorySerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Product, Order, Category
from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework import status


class ImageHandleView(views.APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    parser_classes = (MultiPartParser, FileUploadParser)

    def post(self, request:Request):
        data = request.data.copy()
        data['owner'] = request.user.id
        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'errors':serializer.errors, 'status': status.HTTP_201_CREATED})
        else:
            return Response({'errors':serializer.errors, 'status': status.HTTP_400_BAD_REQUEST})


class MainView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data, status=200)


class CategoryView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def get(self, request, category:str, *args, **kwargs):
        category = Category.objects.get(title=request.path[1:])
        products = Product.objects.filter(category=category)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductsView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        data = request.data.copy()
        data['owner'] = request.user.pk
        serializer = self.serializer_class(data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 201})
        else:
            return Response(serializer.errors, status=400)


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class RegisterView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User(**serializer.validated_data)
            user.set_password(serializer.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'status': 'Error'})


class DeleteOrderView(generics.DestroyAPIView):

    def delete(self, request, *args, **kwargs):
        user = request.user
        order = Order.objects.get(id=request.data['id'])
        if order.orderer == user.id:
            order.delete()
            return Response({'status': "success"}, status=200)
        else:
            return Response({'status': 'error'}, status=400)


class CartView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = OrderSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        products = []
        order = user.order_set.all()[0]

        for order in user.order_set.all():
            products.append(Product.objects.get(id=order.product.id))

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

    def get(self, request, *args, **kwargs):

        user = Token.objects.get(key=request.auth).user
        products = user.product_set.all()
        serializer = ProductSerializer(products, many=True)
        context = {
            'username': user.username,
            'lastname': user.last_name,
            'firstname': user.first_name,
            'email': user.email,
            'products': serializer.data
        }
        return Response(context)

    def put(self, request, *args, **kwargs):
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
            return Response({'status': 200})
        else:
            return Response({'status': 400})

#
# class ProductsNPView(generics.ListAPIView):
#     serializer_class = ProductSerializer
#     queryset = Product.objects.all()
#
#     def get(self, request, *args, **kwargs):
#         data = np.array(list(self.queryset.values_list()))
#         for val in data:
#             print(val[4])
#
#         return Response('its good')
