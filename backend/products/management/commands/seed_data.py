from django.core.management.base import BaseCommand

from categories.models import Category
from products.models import Product


class Command(BaseCommand):
    help = 'Seed sample categories and products for the store catalog.'

    def handle(self, *args, **options):
        categories = [
            ('Audio', 'Modern sound equipment for home and travel.'),
            ('Smart Home', 'Connected devices for everyday comfort.'),
            ('Accessories', 'Useful extras for your digital lifestyle.'),
        ]

        created_categories = []
        for name, description in categories:
            category, _ = Category.objects.get_or_create(name=name, defaults={'description': description})
            created_categories.append(category)

        product_data = [
            (created_categories[0], 'AudioBeam Mini', 'Compact wireless speaker with rich sound and 12-hour battery life.', 59.99, 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80', 25),
            (created_categories[0], 'Pulse Headset', 'Noise-reducing headset built for work and deep focus.', 129.00, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', 18),
            (created_categories[1], 'NestLite Hub', 'Smart hub to control lights, scenes, and assistants from one place.', 89.00, 'https://images.unsplash.com/photo-1558002038-c7fa9d9a87dd?auto=format&fit=crop&w=800&q=80', 32),
            (created_categories[1], 'EcoSense Thermostat', 'Energy-saving thermostat with adaptive comfort modes.', 149.50, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', 22),
            (created_categories[2], 'DeskDock Pro', 'Fast USB-C docking station with multiple ports and power delivery.', 79.99, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', 40),
            (created_categories[2], 'TravelCase 14', 'Protective sleeve for laptop and tablet with dedicated storage.', 39.99, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', 50),
        ]

        for category, name, description, price, image, stock in product_data:
            Product.objects.get_or_create(
                name=name,
                defaults={
                    'description': description,
                    'price': price,
                    'image': image,
                    'category': category,
                    'stock': stock,
                },
            )

        self.stdout.write(self.style.SUCCESS('Seed data loaded successfully.'))
