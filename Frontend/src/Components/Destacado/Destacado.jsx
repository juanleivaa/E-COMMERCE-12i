import React from 'react'
import './Destacado.css'
import Item from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const Destacado = () => {
  

  const [destacado , setDestacado] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/destacado')
    .then((response) => response.json())
    .then((data) => setDestacado(data))
  } , [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div id='destacado'>
    <br /> <br/> <br /><br /> <br /> <br /> <br />
    <div className='destacado' >
      <h1>Destacado</h1>
      <Carousel
          responsive={responsive}
          className='carusel'
          containerClass='carousel-container'
        >
          {destacado.map((item, i) => (
            <div key={i} className='carousel-item'>
              <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            </div>
          ))}
        </Carousel>
    </div>
    </div>

  )
}

export default Destacado
