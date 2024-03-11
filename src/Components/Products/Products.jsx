import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

const Products = () => {

  const  {addProductToCart} = useContext(cartContext );
  console.log("addProductToCart", addProductToCart);

 async function addMyProduct( id ){
  const res = await addProductToCart()

  if(res){
    toast.success( "Added Successfully" , {position:'top-center'} )
  }
  else{
    toast.error("Error Occurred" ,{position:'top-center'} )
  }
  }


  const [allproducts, setallproducts] = useState(null);

  // async function addProduct(id){
  //   const res = await addProductToCart(id);

  //   console.log("res from product:" , res);
  // }

async function getAllProducts(){
 axios.get('https://ecommerce.routemisr.com/api/v1/products', )
  .then((res) => {
   setallproducts(res.data.data);
   console.log(res.data.data);

  })
  .catch((err ) => {
    console.log("error",err);

  })
  
  }


  useEffect( ()=>{
    getAllProducts(); 
  }, []);



    return <>

    {allproducts ?   <div className='container'>

      <div className="row m-5">
        <div className="col-md-9">
      <SimpleSlider/>
        </div>
        <div className="col-md-3">
          <div>
          <img className='w-100 mb-1' style={{height: "150px"}} src={require("../../img/grocery-banner.png")} alt="" />
          </div>
       
        <div>
          <img className='w-100 mb-1' style={{height: "150px"}} src={require("../../img/grocery-banner-2.jpeg")} alt="" />
        </div>
      </div>
      </div>

      <CategorySlider/>


        <div className='row mt-4 gy'>
            {allproducts.map( (product, idx) =>  { 
              
              console.log("product", product);
              // console.log("product", product.id);

              
              return <div key={idx} className='col-md-2'>
              <Link to={`/ProductsDetails/${product.id}/${product.category.name}`} >
              <div className='product m-5 w-100'>
                    <img src={product.imageCover} className='w-100' alt="" />
                    <h4 className='text-main h6'> {product.category.name} </h4>
                    <h2 className='h5'> {product.title.split( ' ' ).slice( 0 , 2).join( ' ' )} </h2>
                    <div className='d-flex justify-content-between'>
                        {product.priceAfterDiscount ? <p> <span className='text-decoration-line-through'>{product.price} </span>- {product.priceAfterDiscount} </p> : <p> {product.price} </p>}
                    <p> <i style={{color:"yellow"}} className='fa-solid fa-star'></i> {product.ratingsAverage}</p>
                    {/* <p>{product.id}</p> */}
                    </div>
                 
                </div>
              </Link>
              <button onClick={() => addMyProduct(product.id)} className='btn bg-main text-white m-auto d-block addbtn'> + Add to Cart</button>

            </div> } )}
           
            
        </div>
    </div> : <div className='d-flex vh-100 bg-white bg-opacity-50 justify-content-center align-items-center'>
    <CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  outerCircleColor="#4fa94d"
  innerCircleColor="#4fa94d"
  barColor="#4fa94d"
  ariaLabel="circles-with-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
         
    </div>
    }

   
    
  
    
    </>
   ;
}

export default Products;
