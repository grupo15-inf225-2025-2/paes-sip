import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/img/logo150.webp";

export default function Navbar({isAuthenticated, user, logout}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || 
           (path === "/" && location.pathname === "/") ||
           (path !== "/" && location.pathname.startsWith(path));
  };

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
                  className={`nav-button ${isActive("/user") ? "active" : ""}`}
                  onClick={() => navigate("/user")}
                >
                  Mi Perfil
                </button>
                <button 
                  className="nav-button logout-button"
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button 
                  className={`nav-button ${isActive("/login") ? "active" : ""}`}
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </button>
                <button 
                  className={`nav-button ${isActive("/register") ? "active" : ""}`}
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
                className={`nav-button ${isActive("/bancopreguntas") ? "active" : ""}`}
              >
                Banco de Preguntas
              </button>
              
              {user?.profesor && (
                <>
                  <button
                    onClick={() => navigate("/creadorpreguntas")}
                    className={`nav-button ${isActive("/creadorpreguntas") ? "active" : ""}`}
                  >
                    Creador de Preguntas
                  </button>
                  <button
                    onClick={() => navigate("/revisar")}
                    className={`nav-button ${isActive("/revisar") ? "active" : ""}`}
                  >
                    Revisar Ensayos
                  </button>
                </>
              )}
              
              <button
                onClick={() => navigate("/ResultadosEst")}
                className={`nav-button ${isActive("/ResultadosEst") ? "active" : ""}`}
              >
                Tu Progreso
              </button>
              
              <button
                onClick={() => navigate("/ensayo/1")}
                className={`nav-button ${isActive("/ensayo") ? "active" : ""}`}
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