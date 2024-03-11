import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {


    return <>
  <div style={{backgroundColor: "#E3E1D9"}} className=' w-100 p-3' >
    <h3 className='m-3'>Get the FreshCart app </h3>
    <h6>We will send you a link, open it on your phone to download the app </h6>
    <div className='d-flex m-4'> 
    <input className='w-75 form-control' type="text" placeholder='Email' /> <button className='bg-main btn w-25'>Share App Link</button>
    </div>
    <div className='bg-main-light mt-3' style={{ height: '2px' }}></div>
    <div className='d-flex justify-content-between mt-2'>
    <h5>Payment Partner <i class="fa-brands fa-amazon-pay"></i> <i class="fa-brands fa-cc-mastercard"></i> <i class="fa-brands fa-cc-visa"></i> <i class="fa-brands fa-cc-paypal"></i></h5>
    <h5>Get Deliveries with FreshCart <img className='w-25' src={require("../../img/images.jpg")}  alt="" /> </h5>
    </div>
  </div>
    </>;
}

export default Footer;

