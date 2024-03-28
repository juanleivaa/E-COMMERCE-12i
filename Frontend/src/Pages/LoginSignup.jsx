import React , { useState } from 'react'
import './CSS/LoginSignup.css'

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
    await fetch('http://localhost:4000/login', {
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
    await fetch('http://localhost:4000/signup', {
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
            {state==='Sign Up' ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Nombre'/> :<></>}
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Su correo electronico'/>
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Contraseña'/>
          </div>
          <button onClick={()=>{state==='Login'? login():signup()}}>Continuar</button>
          {state==='Sign Up' ? 
          <p className='loginsignup-login'>¿Ya tienes una cuenta? <span onClick={() => {setState('Login')}}>Login</span></p> :
          <p className='loginsignup-login'>¿Quieres crear una cuenta? <span onClick={() => {setState('Sign Up')}}>Aquí</span></p>
          }
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>Para continuar, debe aceptar los terminos y condiciones </p>
          </div>
        </div>

    </div>
  )
}

export default LoginSignup
