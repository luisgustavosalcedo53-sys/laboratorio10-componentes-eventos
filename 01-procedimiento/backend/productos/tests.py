from django.test import SimpleTestCase


class ProductosApiTests(SimpleTestCase):
    def test_listado_y_estructura(self):
        response = self.client.get('/api/producto/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [
            {'codigo': 1, 'descripcion': 'Coca cola', 'precio': 2.33},
            {'codigo': 2, 'descripcion': 'Fanta', 'precio': 1.7},
        ])

    def test_cors_desde_react(self):
        response = self.client.get('/api/producto/', HTTP_ORIGIN='http://localhost:3000')
        self.assertEqual(response['Access-Control-Allow-Origin'], '*')

    def test_solo_lectura(self):
        self.assertEqual(self.client.post('/api/producto/').status_code, 405)
