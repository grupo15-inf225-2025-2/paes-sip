import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BancoPreguntas from './pages/BancoPreguntas'
import CreadorPreguntas from './pages/CreadorPreguntas'
import Home from './pages/Home'
import Landing from './pages/Landing'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = '/bancopreguntas' element = {<BancoPreguntas/>}/> 
            <Route path = '/creadorpreguntas' element = {<CreadorPreguntas/>}/> 
            <Route path = '/landing' element = {<Landing/>}/>  {/* Para crear el inicio de sesión*/}
            <Route path = '/' element = {<Home/>}/>  {/*este sera el root*/}
        </Routes>
    </BrowserRouter>
  )
}