import React , { useState } from 'react'
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom'

const LoginSignup = () => {


  const [state,setState] = useState("Login")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const changeHandler = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async () => {
    console.log('login' , formData)
    let responseData;
    await fetch('https://e-commerce-12i-1.onrender.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData=data)

    if(responseData.success){
      localStorage.setItem('token', responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }

  }

  const signup = async () => {
    console.log('signup', formData)
    let responseData;
    await fetch('https://e-commerce-12i-1.onrender.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData=data)

    if(responseData.success){
      localStorage.setItem('token', responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }

  }


  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Nombre' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Su correo electronico' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Contraseña' />
          {state === 'Login' && <Link to="forgot-password"><p>Recuperar contraseña</p></Link>}
        </div>
        <button onClick={() => { state === 'Login' ? login() : signup() }}>Continuar</button>
        {state === 'Sign Up' ?
          <p className='loginsignup-login'>¿Ya tienes una cuenta? <span onClick={() => { setState('Login') }}>Login</span></p> :
          <p className='loginsignup-login'>¿Quieres crear una cuenta? <span onClick={() => { setState('Sign Up') }}>Aquí</span></p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Quiero que me envien notificaciones </p>
        </div>
      </div>

    </div>
  )
}

export default LoginSignup
