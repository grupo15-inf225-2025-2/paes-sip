import unittest
import requests
import time 

class TestEndpointPreguntas(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """
        Configura los datos necesarios para todas las pruebas.
        """
        cls.endpointUrl = "http://localhost:3001/api/pregunta"
        
        # Usamos un texto de pregunta único para la prueba de verificación
        cls.pregunta_valida = {
            "asignatura": "Ciencia y Tecnología",
            "tematica": "Física Cuántica",
            "habilidad": "Conceptualización",
            "pregunta": f"Pregunta de prueba única creada a las {time.time()}",
            "opciones": {"a": "Opción X", "b": "Opción Y"},
            "correcta": 1,
            "puntos": 5
        }

        cls.pregunta_invalida = {
            "asignatura": "Incompleta"
        }

    # --- Pruebas para el endpoint GET ---

    def test_get_preguntas_exitoso(self):
        """
        Caso de Prueba 3: Verifica que la API responda correctamente a un GET general.
        """
        response = requests.get(self.endpointUrl)
        self.assertEqual(response.status_code, 200, "El status code debería ser 200 OK")
        self.assertIsInstance(response.json(), list, "La respuesta debería ser una lista")
        print("\n[GET Éxito] La API respondió correctamente.")

  
    def test_verificar_integridad_de_pregunta_creada(self):
        """
        Caso de Prueba 4: Verifica la integridad de los datos de una pregunta tras ser creada.
        """
        # PASO 1: Crear una nueva pregunta con datos conocidos.
        create_response = requests.post(self.endpointUrl, json=self.pregunta_valida)
        self.assertEqual(create_response.status_code, 201, "Fallo al crear la pregunta de prueba.")
        
        # PASO 2: Obtener la lista completa de preguntas.
        get_response = requests.get(self.endpointUrl)
        self.assertEqual(get_response.status_code, 200)
        
        todas_las_preguntas = get_response.json()
        
        # PASO 3: Buscar la pregunta que acabamos de crear en la lista.
        pregunta_encontrada = None
        for pregunta in todas_las_preguntas:
            if pregunta['pregunta'] == self.pregunta_valida['pregunta']:
                pregunta_encontrada = pregunta
                break
        
        # PASO 4: Verificar que la encontramos y que sus datos son correctos.
        self.assertIsNotNone(pregunta_encontrada, "No se encontró la pregunta recién creada en la lista.")
        
        self.assertEqual(pregunta_encontrada['asignatura'], self.pregunta_valida['asignatura'])
        self.assertEqual(pregunta_encontrada['habilidad'], self.pregunta_valida['habilidad'])
        self.assertEqual(pregunta_encontrada['puntos'], self.pregunta_valida['puntos'])
        print("\n[GET Integridad] La verificación de datos de la pregunta creada fue exitosa.")

    # --- Pruebas para el endpoint POST ---

    def test_post_crear_pregunta_exitosa(self):
        """
        Caso de Prueba 1: Verifica la creación exitosa de una pregunta.
        """
        response = requests.post(self.endpointUrl, json=self.pregunta_valida)
        self.assertEqual(response.status_code, 201, "El status code debería ser 201 Created")
        self.assertIn('id', response.json(), "La respuesta de creación debe incluir un 'id'")
        print(f"\n[POST Éxito] Se creó una pregunta exitosamente.")

    def test_post_crear_pregunta_fallida(self):
        """
        Caso de Prueba 2: Verifica que la API devuelva un error con datos incompletos.
        """
        response = requests.post(self.endpointUrl, json=self.pregunta_invalida)
        self.assertEqual(response.status_code, 400, "El status code debería ser 400 Bad Request")
        self.assertIn('error', response.json(), "La respuesta de error debe contener la clave 'error'")
        print("\n[POST Fallo] La API respondió correctamente con un error 400.")

# Esto permite ejecutar el script directamente
if __name__ == '__main__':
    unittest.main()