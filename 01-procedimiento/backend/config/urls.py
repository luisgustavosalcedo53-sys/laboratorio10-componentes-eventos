from django.urls import path
from productos.views import listado_productos

urlpatterns = [path('api/producto/', listado_productos, name='productos')]
