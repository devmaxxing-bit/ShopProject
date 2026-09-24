from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']
        read_only_fields = ['id', 'product_name']

    def get_product_name(self, obj):
        return obj.product.name


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'shipping_name', 'phone', 'address', 'status', 'total_price', 'created_at', 'items']
        read_only_fields = ['id', 'user', 'status', 'total_price', 'created_at', 'items']


class OrderItemInputSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class OrderCreateSerializer(serializers.Serializer):
    shipping_name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=30)
    address = serializers.CharField()
    items = OrderItemInputSerializer(many=True)
