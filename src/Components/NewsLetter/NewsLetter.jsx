import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Obtene noticias y adelantos en tu email</h1>
        <div>
            <input type="email" placeholder='Tú email'/>
            <button>Enviar</button>
        </div>
    </div>
  )
}

export default NewsLetter
