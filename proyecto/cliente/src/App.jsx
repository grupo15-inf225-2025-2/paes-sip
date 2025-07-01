import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import 'katex/dist/katex.min.css'
import './assets/css/Ensayo.css';

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
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    isLoading: true
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem('user')
        
        if (userData) {
          const parsedUser = JSON.parse(userData)
          const response = await axios.get(`/api/usuario/${parsedUser.id}`)
          
          setAuthState({
            isAuthenticated: true,
            user: response.data,
            isLoading: false
          })
        }
      } catch (error) {
        console.error('Error de autenticación:', error)
        clearAuthData()
      } finally {
        setAuthState(prev => ({ ...prev, isLoading: false }))
      }
    }
    
    checkAuth()
  }, [])

  const clearAuthData = () => {
    localStorage.removeItem('user')
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false
    })
  }

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/usuario/login', credentials)
      
      const userResponse = await axios.get(`/api/usuario/${response.data.id}`)
      
      localStorage.setItem('user', JSON.stringify(userResponse.data))
      
      setAuthState({
        isAuthenticated: true,
        user: userResponse.data,
        isLoading: false
      })
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      }
    }
  }

  const register = async (userData) => {
    try {
      // 1. Registrar nuevo usuario
      const response = await axios.post('/api/usuario/register', userData)
      
      // 2. Obtener datos completos del usuario registrado
      const userResponse = await axios.get(`/api/usuario/${response.data.id}`)
      

      localStorage.setItem('user', JSON.stringify(userResponse.data))
      
      setAuthState({
        isAuthenticated: true,
        user: userResponse.data,
        isLoading: false
      })
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al registrar' 
      }
    }
  }

  const logout = () => {
    clearAuthData()
  }

  return (
<BrowserRouter>
  {!location.pathname.includes('/landing') && (
    <Navbar 
      isAuthenticated={authState.isAuthenticated} 
      user={authState.user} 
      logout={logout} 
    />
  )}
  
  <Routes>
    <Route path="/" element={
      authState.isAuthenticated ? 
        <Home user={authState.user} /> : 
        <Landing showHeader={false} />
        } />

        
        <Route path="/login" element={
          !authState.isAuthenticated ? 
            <Login setAuthState={setAuthState} /> : 
            <Navigate to="/" />
        } />
        
        <Route path="/register" element={
          !authState.isAuthenticated ? 
            <Register register={register} /> : 
            <Navigate to="/" />
        } />
        
        {/* Rutas protegidas */}
        <Route path="/bancopreguntas" element={
          authState.isAuthenticated ? 
            <BancoPreguntas user={authState.user} /> : 
            <Navigate to="/login" />
        } />
        
        <Route path="/creadorpreguntas" element={
          authState.isAuthenticated && authState.user?.profesor ? 
            <CreadorPreguntas user={authState.user} /> : 
            <Navigate to="/" />
        } />
        
        <Route path="/resultadosEst" element={
          authState.isAuthenticated ? 
            <ResultadosEst user={authState.user} /> : 
            <Navigate to="/login" />
        } />
        
        <Route path="/ensayo/:id" element={
          authState.isAuthenticated ? 
            <Ensayos user={authState.user} /> : 
            <Navigate to="/login" />
        } />
        
        <Route path="/revisar/:id" element={
          authState.isAuthenticated && authState.user?.profesor ? 
            <Revisar user={authState.user} /> : 
            <Navigate to="/" />
        } />
      </Routes>
    </BrowserRouter>
  )
}