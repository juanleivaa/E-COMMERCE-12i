import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/forgot-password', {
        password: password,
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
        <h1>Reset Contraseña</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              name="password"
              value={email}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <button type="submit">Enviar Correo</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
