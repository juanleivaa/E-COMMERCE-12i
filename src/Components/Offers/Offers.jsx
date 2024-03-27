import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Ofertas</h1>
            <h1>Exclusivas</h1>
            <p>ONLY ON BEST SELLERS PRODUCTOS</p>
            <button>Check now</button>
        </div>  
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers
