import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Carts from './Components/Carts/Carts';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import { AuthContextProvider } from './Context/AuthContext';
import ProductsDetails from './Components/ProductsDetails/ProductsDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';





const MyRouter = createBrowserRouter([
  {path: '/', element:  <Layout/>, children: [
    {index:  true,         element: <Register/>},
    {path: '/Register', element: <Register/>},
    {path: '/Login',    element: <Login/>},
    {path: '/Products', element: <Products/>},
    {path: '/ProductsDetails/:id/:category', element: <ProductsDetails/>}, 
    {path: '/Categories', element: <Categories/>},
    {path: '/Carts', element: <Carts/>},
    {path: '/Brands', element: <Brands/>},
    {path: '*', element: <NotFound/>},


  

  ]}
])

export default function App() {

  
  return <>
<CartContextProvider>
  <AuthContextProvider>
    <RouterProvider router= {MyRouter} />
  </AuthContextProvider>
</CartContextProvider>
<Toaster/>

  </>

}



