import React from 'react'
import './Destacado.css'
import Item from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'

const Destacado = () => {

  const [destacado , setDestacado] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/destacado')
    .then((response) => response.json())
    .then((data) => setDestacado(data))
  } , [])



  return (
    <div className='destacado'>
      <h1>Destacado</h1>
      <hr/>
      <div className="destacado-item">
        {destacado.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
        })}
      </div>
    </div>
  )
}

export default Destacado
