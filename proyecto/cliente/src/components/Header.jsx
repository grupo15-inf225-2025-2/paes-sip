import { useNavigate } from "react-router-dom";

import logo from "../assets/img/logo150.webp";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <section className="header-nav">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" />
            <span className="logo-text">EduPAES</span>
          </div>
        </section>
      </div>

      <nav className="navbar">
        <div className="bottom-nav">
          <div className="menu-items">
            <button
              onClick={() => navigate("/bancopreguntas")}
              className="nav-button"
            >
              Banco de Preguntas
            </button>
            <button
              onClick={() => navigate("/creadorpreguntas")}
              className="nav-button"
            >
              Creador de Preguntas
            </button>
            <button
              onClick={() => navigate("/ResultadosEst")}
              className="nav-button"
            >
              Tu Progreso
            </button>
            <button
              onClick={() => navigate("/ensayo/1")} // Asumiendo que el primer ensayo tiene el ID 1
              className="nav-button"
            >
              Ensayo
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}