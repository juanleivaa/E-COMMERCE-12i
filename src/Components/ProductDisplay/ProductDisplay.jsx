import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-prices-old">${product.old_price}</div>
            <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
            Esta camisa de manga larga es perfecta para añadir un toque de estilo y frescura a tu guardarropa. Confeccionada en algodón suave y transpirable, esta camisa presenta un estampado floral vibrante que le da un aire primaveral y alegre. Su corte clásico y versátil la hace ideal para combinarla con jeans para un look casual o con pantalones chinos para un estilo más elegante. Además, su tejido ligero la convierte en una opción cómoda y fresca para llevar durante todo el día. Añade un toque de color y vitalidad a tu outfit con esta encantadora camisa de algodón con estampado floral.
        </div>
        <div className="productdisplay-right-size">
            <h1>Seleccionar talle</h1>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        </div>
        <button onClick={() => {addToCart(product.id)}}>Añadir al carrito</button>
        <p className='productdisplay-right-category'><span>Category :</span> Women , T-shirt, Crop</p>
        <p className='productdisplay-right-category'><span>Tags :</span> Moderno , Latest</p>
      </div>
    </div>
  )
}

export default ProductDisplay
