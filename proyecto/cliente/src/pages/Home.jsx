import React from 'react';
import image from '../assets/img/images.jpeg'; // Importar la imagen
import '../assets/css/Home.css'; // Importar el CSS

export default function Home({ user }) {
  return (
    <div>
      <div className="welcome-section">
        <img src={image} alt="Bienvenidos a EduPAES" className="welcome-image" />
        <h1 className="welcome-text">Bienvenido{ user?.profesor? ' profesor' : ' estudiante'} {user?.nombre_usuario}</h1>
      </div>
    </div>
  );
}