import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register({ setIsAuthenticated, setUser }) {
  const [userData, setUserData] = useState({
    nombre_usuario: '',
    contrasena: '',
    escuela: '',
    profesor: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const registerUser = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3002/api/usuario/register', userData);
      return { success: true };
    } catch (err) {
      // Manejo de errores detallado
      let errorMessage = 'Error al registrar usuario';
      
      if (err.response) {
        if (err.response.status === 409) {
          errorMessage = 'El nombre de usuario ya existe';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setError(errorMessage);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!userData.nombre_usuario || !userData.contrasena) {
      setError('Nombre de usuario y contraseña son obligatorios');
      return;
    }
    
    if (userData.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    await registerUser(userData);
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre_usuario">Nombre de Usuario *</label>
          <input
            id="nombre_usuario"
            type="text"
            name="nombre_usuario"
            value={userData.nombre_usuario}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña *</label>
          <input
            id="contrasena"
            type="password"
            name="contrasena"
            value={userData.contrasena}
            onChange={handleChange}
            required
            minLength="6"
            disabled={loading}
          />
          <small className="hint">Mínimo 6 caracteres</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="escuela">Escuela (Opcional)</label>
          <input
            id="escuela"
            type="text"
            name="escuela"
            value={userData.escuela}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        
        <div className="form-group checkbox">
          <label htmlFor="profesor">
            <input
              id="profesor"
              type="checkbox"
              name="profesor"
              checked={userData.profesor}
              onChange={handleChange}
              disabled={loading}
            />
            ¿Eres profesor?
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Registrando...' : 'Crear cuenta'}
        </button>
      </form>
      
      <p className="auth-footer">
        ¿Ya tienes cuenta?{' '}
        <a 
          href="/login" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          Inicia sesión aquí
        </a>
      </p>
    </div>
  );
}