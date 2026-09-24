from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('categories.urls')),
    path('api/', include('products.urls')),
    path('api/', include('orders.urls')),
    path('api/users/', include('users.urls')),
]

#jsjdshjfhjdsfhdsjhf
