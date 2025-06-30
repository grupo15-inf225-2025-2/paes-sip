import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'

import Landing from './pages/Landing'
import Home from './pages/Home'
import CreadorPreguntas from './pages/CreadorPreguntas'
import BancoPreguntas from './pages/BancoPreguntas'
import ResultadosEst from './pages/ResultadosEst'
import Ensayos from './pages/Ensayos'
import Revisar from './pages/Revisar'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Header'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await axios.get('/api/usuario/me')
          setIsAuthenticated(true)
          setUser(response.data)
        }
      } catch (error) {
        console.error('Error de autenticación:', error)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/usuario/login', credentials)
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      setIsAuthenticated(true)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error al iniciar sesión' }
    }
  }

  const register = async (userData) => {
    try {
      await axios.post('/api/usuario/register', userData)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error al registrar' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setIsAuthenticated(false)
    setUser(null)
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} user={user} logout={logout} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home user={user} /> : <Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={!isAuthenticated ? <Login login={login} /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register register={register} /> : <Navigate to="/" />} />
        <Route path="/bancopreguntas" element={isAuthenticated ? <BancoPreguntas user={user} /> : <Navigate to="/login" />} />
        <Route path="/creadorpreguntas" element={isAuthenticated ? <CreadorPreguntas user={user} /> : <Navigate to="/login" />} />
        <Route path="/resultadosEst" element={isAuthenticated ? <ResultadosEst user={user} /> : <Navigate to="/login" />} />
        <Route path="/ensayo/:id" element={isAuthenticated ? <Ensayos user={user} /> : <Navigate to="/login" />} />
        <Route path="/revisar/:id" element={isAuthenticated && user?.profesor ? <Revisar user={user} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}