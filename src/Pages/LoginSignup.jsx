import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Sign up</h1>
          <div className="loginsignup-fields">
            <input type="text" placeholder='Nombre'/>
            <input type="email" placeholder='Su correo electronico'/>
            <input type="password" placeholder='Contraseña'/>
          </div>
          <button>Continuar</button>
          <p className='loginsignup-login'>Ya tienes una cuenta? <span>Login</span></p>
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>Para continuar, debe aceptar los terminos y condiciones </p>
          </div>
        </div>

    </div>
  )
}

export default LoginSignup
