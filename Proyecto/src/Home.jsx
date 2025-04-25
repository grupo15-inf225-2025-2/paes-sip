import { useState } from 'react'
import App from './App'
import App1 from './App1'

function Home() {
  const [currentApp, setCurrentApp] = useState('app1') // 'app' o 'app1'
  return (
    <div className="main-container">
      <div className="app-selector">
        <button 
          onClick={() => setCurrentApp('app')} 
          className={currentApp === 'app' ? 'active' : ''}
        >
          Creador de Preguntas
        </button>
        <button 
          onClick={() => setCurrentApp('app1')} 
          className={currentApp === 'app1' ? 'active' : ''}
        >
          Banco de Preguntas
        </button>
      </div>

      <div className="app-content">
        {currentApp === 'app' ? <App /> : <App1 />}
      </div>
    </div>
  )
}

export default Home