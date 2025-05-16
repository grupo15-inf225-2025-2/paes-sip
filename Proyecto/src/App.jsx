import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreadorPreguntas from './pages/CreadorPreguntas'
import BancoPreguntas from './pages/BancoPreguntas'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = '/bancopreguntas' element = {<BancoPreguntas/>}/> 
            <Route path = '/creadorpreguntas' element = {<CreadorPreguntas/>}/> 
            <Route path = '/' element = {<Home/>}/>  {/*este sera el root*/}
        </Routes>
    </BrowserRouter>
  )
}