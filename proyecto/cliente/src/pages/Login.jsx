import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setIsAuthenticated, setUser }) {
  const [credentials, setCredentials] = useState({
    nombre_usuario: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 1. Realizar login
      const response = await axios.post('http://localhost:3001/api/usuario/login', credentials);
      
      // 2. Guardar token en localStorage
      localStorage.setItem('token', response.data.token);
      
      // 3. Configurar headers de axios para futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // 4. Obtener datos del usuario
      const userResponse = await axios.get('http://localhost:3001/api/usuario/me');
      
      // 5. Actualizar estado global
      setIsAuthenticated(true);
      setUser(userResponse.data);
      
      // 6. Redirigir al home
      navigate('/');
      
    } catch (err) {
      // Manejo de errores
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Error al iniciar sesión';
      setError(errorMessage);
      
      // Limpiar credenciales en caso de error
      if (err.response?.status === 401) {
        setCredentials({
          nombre_usuario: '',
          contrasena: ''
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre_usuario">Nombre de Usuario</label>
          <input
            id="nombre_usuario"
            type="text"
            name="nombre_usuario"
            value={credentials.nombre_usuario}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            name="contrasena"
            value={credentials.contrasena}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Procesando...' : 'Ingresar'}
        </button>
      </form>
      
      <p className="auth-footer">
        ¿No tienes cuenta?{' '}
        <a href="/register" onClick={(e) => {
          e.preventDefault();
          navigate('/register');
        }}>
          Regístrate aquí
        </a>
      </p>
    </div>
  );
}