from decimal import Decimal

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product
from .models import Order, OrderItem
from .serializers import OrderCreateSerializer, OrderSerializer


class OrderListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).prefetch_related('items__product')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        payload = serializer.validated_data
        items = payload['items']
        if not items:
            return Response({'detail': 'Cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=request.user,
            shipping_name=payload['shipping_name'],
            phone=payload['phone'],
            address=payload['address'],
            total_price=Decimal('0.00'),
        )

        total = Decimal('0.00')
        for item in items:
            product = get_object_or_404(Product, pk=item['product'])
            quantity = item['quantity']
            if product.stock < quantity:
                order.delete()
                return Response({'detail': f'Not enough stock for {product.name}.'}, status=status.HTTP_400_BAD_REQUEST)

            order_item = OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price,
            )
            total += Decimal(product.price) * quantity
            product.stock -= quantity
            product.save()
            order_item.save()

        order.total_price = total
        order.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        if order.user != request.user:
            return Response({'detail': 'You cannot access another user order.'}, status=status.HTTP_403_FORBIDDEN)
        return Response(OrderSerializer(order).data)
