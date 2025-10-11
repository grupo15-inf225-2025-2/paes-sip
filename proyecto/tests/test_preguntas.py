import unittest
import requests

class TestEndpointPreguntas(unittest.TestCase):
	@classmethod
	def setUpClass(cls):
		cls.endpointUrl = "http://backend:3001/api/pregunta"
	def test_get_vacio(self):
		response = requests.get(self.endpointUrl)
		self.assertEqual(response.status_code, 200)