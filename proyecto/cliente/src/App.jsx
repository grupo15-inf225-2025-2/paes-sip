import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Home from './pages/Home'
import CreadorPreguntas from './pages/CreadorPreguntas'
import BancoPreguntas from './pages/BancoPreguntas'
import Ensayos from './pages/Ensayos'
import Revisar from './pages/Revisar'


export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = '/' element = {<Home/>}/>  {/*este sera el root*/}
            <Route path = '/bancopreguntas' element = {<BancoPreguntas/>}/> 
            <Route path = '/creadorpreguntas' element = {<CreadorPreguntas/>}/> 
            <Route path = '/landing' element = {<Landing/>}/>  {/* Para crear el inicio de sesión*/}
            <Route path = '/ensayo/:id' element = {<Ensayos/>}/> {/*arreglar para agregar id-> segun ensayo en base de datos*/}
            <Route path = '/revisar/:id' element = {<Revisar/>}/>
        </Routes>
    </BrowserRouter>
  )
}