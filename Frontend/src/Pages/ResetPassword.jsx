import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const { id, token } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://e-commerce-12i-rc.onrender.com/reset-password/${id}/${token}`, {
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
        <h1>Nueva constraseña</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="password"
              placeholder="Su nueva contraseña"
              autoComplete='off'
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
