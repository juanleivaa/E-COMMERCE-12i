import React , {useContext} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


const CartItems = () => {
    const {all_products , cartItems , removeFromCart} = useContext(ShopContext)
  return (
    <div className='cartitems'>
      <div className="cartitem-format-main">
        <p>Productos</p>
        <p>Titulo</p>
        <p>Precio</p>
        <p>Unidades</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
        {all_products.map((e) => {
            if(cartItems[e.id]>0)
            {
                return <div>
                            <div className="cartitems-format cartitem-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price*cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                            </div>
                        </div>
            }
        })}

    </div>
  )
}

export default CartItems
