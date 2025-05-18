import { useNavigate } from "react-router-dom"

import logo from "../assets/img/logo150.webp"

export default function Header() {
  const navigate = useNavigate()

  return (
    <header>
      <div>
        <section className="header-nav">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" />
            <span style={{ fontWeight: 'bold' }}>EduPAES</span>
          </div>
          <div className="user-controls">
            <button className="nav-link">
              Usuario
            </button>
            <button className="nav-link">
              Cerrar sesión
            </button>
          </div>
        </section>
      </div>

      <nav className="navbar">
        <div className="bottom-nav">
          <div className="menu-items">
            <button
              onClick={() => navigate("/bancopreguntas")}
              className="nav-link"
            >
              Banco de Preguntas
            </button>
            <button
              onClick={() => navigate("/creadorpreguntas")}
              className="nav-link"
            >
              Creador de Preguntas
            </button>
            <button
              onClick={() => navigate("/ResultadosEst")}
              className="nav-link"
            >
              Tu Progreso
            </button>
            <button
              onClick={() => navigate("/ensayo/:id")}
              className="nav-link"
            >
              Ensayos
            </button>
          </div>
        </div>


      </nav>
    </header >
  )
}