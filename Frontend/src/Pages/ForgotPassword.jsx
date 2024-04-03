import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://e-commerce-12i-1.onrender.com//forgot-password', {
        email: email,
      });

      const data = response.data;

      if (data.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la solicitud de recuperación de contraseña');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Recuperar Contraseña</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Su correo electronico"
            />
          </div>
          <button type="submit">Enviar Correo</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
