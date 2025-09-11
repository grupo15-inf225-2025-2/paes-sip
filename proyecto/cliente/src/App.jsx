import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CreadorPreguntas from './pages/CreadorPreguntas'
import BancoPreguntas from './pages/BancoPreguntas'
import ResultadosEst from './pages/ResultadosEst'
import Ensayos from './pages/Ensayos'
import Revisar from './pages/Revisar'


export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = '/' element = {<Home/>}/>  {/*este sera el root*/}
            <Route path = '/bancopreguntas' element = {<BancoPreguntas/>}/> 
            <Route path = '/creadorpreguntas' element = {<CreadorPreguntas/>}/>
            <Route path = '/ResultadosEst' element = {<ResultadosEst/>}/> 
            <Route path = '/ensayo/:id' element = {<Ensayos/>}/> {/*arreglar para agregar id-> segun ensayo en base de datos*/}
            <Route path = '/revisar/:id' element = {<Revisar/>}/>
        </Routes>
    </BrowserRouter>
  )
}