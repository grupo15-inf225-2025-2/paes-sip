import logo from "../assets/img/logo150.webp"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()

  return (
    <header>
      <div className = "pedro">
          <img src = {logo} style={{ marginRight: "auto", width: "80px", height: "80px"}} onClick={() => navigate("/")}/>
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
            activate = "arreglar despues"
            >
            Banco de Preguntas
          </button>
          <button
            onClick={() => navigate("/creadorpreguntas")}
            activate = "arreglar despues"
          >
            Creador de Preguntas
          </button>
      </nav>
    </header>
  )
}
