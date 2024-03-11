import axios from 'axios';
import React, { createContext } from 'react';

export const cartContext = createContext();

export default function CartContextProvider({children}){

    function addProductToCart(productId){ 
        axios.post( 'https://ecommerce.routemisr.com/api/v1/cart' , {    
            
        "productId": productId
    },{
        headers: { token: localStorage.getItem('tkn')}
    })
    .then((res)=>{
        console.log("res", res);
    })
    .catch((err)=>{
        console.log("err", err);
    })
    }
return <cartContext.Provider  value={ { addProductToCart } }>

{children}

</cartContext.Provider>
}