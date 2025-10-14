import unittest
import requests

class TestEndpointEnsayos(unittest.TestCase):

	@classmethod
	def setUpClass(cls):
		cls.endpointUrl = "http://backend:3001/api/ensayo"
		cls.ensayo_valido = {
			"titulo": "Ensayo Diagnóstico",
			"descripcion": "...",
			"preguntas": []
		}

	def test_get(self):
		response = requests.get(self.endpointUrl)
		self.assertEqual(response.status_code, 200)

		data = response.json()
		self.assertIsInstance(data, list) # Verifica que es una lista
	
	def test_post_valido(self):
		response = requests.post(self.endpointUrl, json=self.ensayo_valido)
		self.assertEqual(response.status_code, 201)

		data = response.json()
		self.assertIn("id", data) # Verifica que se haya asignado un ID
		# cleanup
		requests.delete(f"{self.endpointUrl}/{data['id']}")