import unittest
import requests

class TestEndpointPreguntas(unittest.TestCase):
	@classmethod
	def setUpClass(cls):
		cls.endpointUrl = "http://backend:3001/api/pregunta"
		cls.pregunta_valida = {
			"asignatura": "Ciencia y Tecnología",
            "tematica": "Física Cuántica",
            "habilidad": "Conceptualización",
            "pregunta": "Pregunta de prueba única",
            "opciones": {"a": "Opción X", "b": "Opción Y"},
            "correcta": 1,
            "puntos": 5,
			"libre": True,
			"etiquetas": ["Cuántica"]
        }
	def test_get(self):
		response = requests.get(self.endpointUrl)
		self.assertEqual(response.status_code, 200)

		data = response.json()
		self.assertIsInstance(data, list)  # Verifica que es una lista)

	def test_post_valido(self):
		response = requests.post(self.endpointUrl, json=self.pregunta_valida)
		self.assertEqual(response.status_code, 201)

		data = response.json()
		self.assertIn("id", data) # Verifica que se haya asignado un ID
		# cleanup
		requests.delete(f"{self.endpointUrl}/{data['id']}")