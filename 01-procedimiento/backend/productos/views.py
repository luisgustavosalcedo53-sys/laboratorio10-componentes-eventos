from django.http import JsonResponse
from django.views.decorators.http import require_GET


@require_GET
def listado_productos(request):
    """Devuelve exactamente los campos y ejemplos solicitados por la guía."""
    productos = [
        {'codigo': 1, 'descripcion': 'Coca cola', 'precio': 2.33},
        {'codigo': 2, 'descripcion': 'Fanta', 'precio': 1.7},
    ]
    return JsonResponse(productos, safe=False, json_dumps_params={'ensure_ascii': False, 'indent': 2})
