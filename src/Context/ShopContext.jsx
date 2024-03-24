import React, { createContext } from 'react';
import all_products from "../Components/Assets/all_product"

// Crear un nuevo contexto
export const ShopContext = createContext(null);

// Proveedor de contexto para proporcionar datos a los componentes secundarios
const ShopContextProvider = (props) => {
    // Definir el valor del contexto
    const contextValue = { all_products };

    return (
        // Proveer el contexto a los componentes secundarios
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
