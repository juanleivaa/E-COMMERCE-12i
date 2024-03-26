import React , {useContext} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


const CartItems = () => {
    const { all_products , cartItems , removeFromCart , getTotalCartAmount } = useContext(ShopContext)
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
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
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price*cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                            </div>
                        </div>
            }
            return null;
        })}
        <div className="cartitem-down">
          <div className="cartitem-total">
            <h1>Cart Total</h1>
            <div>
                <div className="cartitem-total-item">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitem-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitem-total-item">
                  <h3>Total</h3>
                  <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cartitem-promocode">
              <p>Si tienes un codigo de descuento , ingresalo</p>
              <div className='cartitem-promobox'>
                <input type="text" placeholder='code' />
                <button>Enviar</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default CartItems
