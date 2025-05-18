import { useNavigate } from "react-router-dom"

import logo from "../assets/img/logo150.webp"

export default function Header() {
  const navigate = useNavigate()

  return (
    <header>
      <div className="pedro">
        <img src={logo} style={{ marginRight: "auto", width: "80px", height: "80px" }} onClick={() => navigate("/")} />
        <button>
          Usuario
        </button>
        <button>
          Cerrar sesión
        </button>
      </div>
      <nav>
        <button
          onClick={() => navigate("/bancopreguntas")}
          activate="arreglar despues"
        >
          Banco de Preguntas
        </button>
        <button
          onClick={() => navigate("/creadorpreguntas")}
          activate="arreglar despues"
        >
          Creador de Preguntas
        </button>
        <button
          onClick={() => navigate("/ensayo/:id")}
          activate="arreglar despues"
        >
          Ensayos
        </button>
      </nav>
    </header>
  )
}
