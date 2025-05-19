import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css' //estilo global
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)