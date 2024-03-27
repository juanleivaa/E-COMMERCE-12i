import React from 'react'
import './Destacado.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

const Destacado = () => {
  return (
    <div className='destacado'>
      <h1>Destacado</h1>
      <hr/>
      <div className="destacado-item">
        {data_product.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
        })}
      </div>
    </div>
  )
}

export default Destacado
