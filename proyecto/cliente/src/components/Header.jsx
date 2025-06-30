import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo150.webp";

export default function Navbar({ isAuthenticated, user, logout }) {
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <section className="header-nav">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" />
            <span className="logo-text">EduPAES</span>
          </div>
          
          <div className="user-controls">
            {isAuthenticated ? (
              <>
                <span className="welcome-text">Hola, {user?.nombre_usuario}</span>
                <button 
                  className="nav-button" 
                  onClick={() => navigate("/user")}
                >
                  Mi Perfil
                </button>
                <button 
                  className="nav-button" 
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button 
                  className="nav-button" 
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </button>
                <button 
                  className="nav-button" 
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </section>
      </div>

      {isAuthenticated && (
        <nav className="navbar">
          <div className="bottom-nav">
            <div className="menu-items">
              <button
                onClick={() => navigate("/bancopreguntas")}
                className="nav-button"
              >
                Banco de Preguntas
              </button>
              
              {user?.profesor && (
                <>
                  <button
                    onClick={() => navigate("/creadorpreguntas")}
                    className="nav-button"
                  >
                    Creador de Preguntas
                  </button>
                  <button
                    onClick={() => navigate("/revisar")}
                    className="nav-button"
                  >
                    Revisar Ensayos
                  </button>
                </>
              )}
              
              <button
                onClick={() => navigate("/ResultadosEst")}
                className="nav-button"
              >
                Tu Progreso
              </button>
              
              <button
                onClick={() => navigate("/ensayo/1")}
                className="nav-button"
              >
                Realizar Ensayo
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}