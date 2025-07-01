import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setAuthState }) {
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
      const response = await axios.post('http://localhost:3002/api/usuario/login', credentials);
      
      if (response.data.success) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          isLoading: false
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsAuthenticated(true);
        setUser(response.data.user);
        navigate('/');
      } else {
        setError(response.data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      let errorMessage = 'Error al iniciar sesión';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Credenciales incorrectas';
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="error-message">{error}</div>}
      
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
            autoComplete="username"
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
            autoComplete="current-password"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={`auth-button ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Verificando...</span>
            </>
          ) : (
            'Ingresar'
          )}
        </button>
      </form>
      
      <p className="auth-footer">
        ¿No tienes cuenta?{' '}
        <button 
          className="text-button"
          onClick={(e) => {
            e.preventDefault();
            navigate('/register');
          }}
          disabled={loading}
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}