import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../Context/CartContext';

function ProductDetails() {

  const  {addProductToCart} = useContext(cartContext );
  console.log("addProductToCart", addProductToCart);


  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getProductDetails() {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProductDetails(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    getProductDetails();
  }, [id]);

  async function addProduct(id) {
    try {
      const res = await addProductToCart(id);
      if (res) {
        toast.success("Added Successfully", { duration: 1500, position: "top-center" });
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      toast.error(error.message, { duration: 1500, position: "top-center" });
    }
  }
  

  if (isLoading) {
    return (
      <div className='d-flex vh-100 bg-white bg-opacity-50 justify-content-center align-items-center'>
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
    );
  }

  if (isError || !productDetails) {
    return <Navigate to={'/Products'} />;
  }

  return (
    <>
      <Helmet>
        <title>{productDetails.title}</title>
      </Helmet>
      
      <div className='container'>
        <div className='row g-3 mt-3'>
          <div className='col-md-3'>
            <figure>
              <img className='w-100' src={productDetails.imageCover} alt={productDetails.description} />
            </figure>
          </div>
          <div className='col-md-9 d-flex justify-content-center align-item-center'>
            <article className='mt-5'>
              <h2 className='m-auto mb-3'>{productDetails.title}</h2>
              <p className='m-auto'>{productDetails.description}</p>
              <h6 className='text-main mt-2'>{productDetails.category.name}</h6>
              <div className='d-flex justify-content-between mt-3 fw-bold'>
                {productDetails.priceAfterDiscount ? (
                  <p>
                    <span className='text-decoration-line-through'>{productDetails.price}</span> - {productDetails.priceAfterDiscount}
                  </p>
                ) : (
                  <p>{productDetails.price}</p>
                )}
                <p>
                  <span className='m-auto'>
                    <i style={{ color: "yellow" }} className='fa-solid fa-star me-2'></i>
                  </span>
                  {productDetails.ratingsAverage}
                </p>
                <p> {productDetails.id}</p>
              </div>
              <button onClick={ ()=> addProduct(productDetails.id) } className='btn bg-main text-white w-100 m-3'>
                + Add to Cart
              </button>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
