from rest_framework import serializers

from categories.models import Category
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'category', 'category_name', 'stock', 'created_at']
        read_only_fields = ['id', 'created_at', 'category_name']

    def get_category_name(self, obj):
        return obj.category.name
