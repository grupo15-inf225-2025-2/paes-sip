import React from 'react';
import Header from '../components/Header';
import image from '../assets/img/images.jpeg'; // Importar la imagen
import '../assets/css/Home.css'; // Importar el CSS

export default function Home() {
  return (
    <div>
      <Header />
      <div className="welcome-section">
        <img src={image} alt="Bienvenidos a EduPAES" className="welcome-image" />
        <h1 className="welcome-text">Bienvenidos a EduPAES</h1>
      </div>
    </div>
  );
}