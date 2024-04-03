import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// Crear un nuevo contexto
export const ShopContext = createContext(null);


const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}




// Proveedor de contexto para proporcionar datos a los componentes secundarios
const ShopContextProvider = (props) => {


    const [all_products , setAll_Products] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart());
    // Definir el valor del contexto


    useEffect(() => {
        fetch('https://e-commerce-12i-1.onrender.com//allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Products(data))


        if(localStorage.getItem('token')){
            fetch('https://e-commerce-12i-1.onrender.com//getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token':`${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            })
            .then((response) => response.json())
            .then((data) => setCartItems(data))
        }

    }, [])



    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev , [itemId]: prev[itemId] + 1}))
        if(localStorage.getItem('token')){
            fetch('https://e-commerce-12i-1.onrender.com//addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token':`${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId":itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev , [itemId]: prev[itemId] - 1}))
        if(localStorage.getItem('token')){
            fetch('https://e-commerce-12i-1.onrender.com//removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token':`${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId":itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item]
            }
        }
        return totalItem;
    }
    
    const contextValue = { all_products , cartItems, addToCart, removeFromCart , getTotalCartAmount , getTotalCartItems};

    return (
        // Proveer el contexto a los componentes secundarios
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
