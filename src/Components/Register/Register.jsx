import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState }  from 'react';
import  { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';




const Register = () => {


    const userData = {
        Name: "",
        email: "",
        phone: "",
        password: "",
        RePassword: "",
    };

const [isSuccess, setisSuccess] = useState(false);
const [errorMsg, seterrorMsg] = useState(undefined);
const [isLoading, setisLoading] = useState(false);

const navigate = useNavigate();




    async function onSubmit(values){
        
        // console.log("Submited",values);
        setisLoading (true);

        const res = await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signup` , values ) 

         .then( (x) =>{
            console.log("in case of success: x", x);
            setisSuccess( true );
            setTimeout(function(){
                setisSuccess( true ); } , 2000);
            
         })
         .catch( (x) =>{
            seterrorMsg(x.response.data.message)
            setTimeout(function(){
                seterrorMsg( true ); } , 2000);
         } )
        console.log(res);

        setisLoading (false);

        navigate('/Login')
    }
     
 
    const myFormik = useFormik( {
     initialValues: userData,
     onSubmit: onSubmit,

     validate: function( values ){

        const errors ={};



        const nameRegex = /^[A-Z][a-zA-Z0-9-_]{2,49}$/;
        const phoneRegex = /^01[0125][0-9]{8}$/;




        if ( nameRegex.test(values.Name) !== true) {
            errors.Name = "Your name must be from 3 to 8 characters starting with a capital letter";
        }


        if ( values.email.includes( '@') !== true || values.email.includes( '.' ) !== true) {
            errors.email = " Your Email must be in format";
        }

        if (phoneRegex.test(values.phone) !== true) {
            errors.phone = "Your phone number must be an Egyptian number";
        }

        if (values.password.length < 6 || values.password.length > 20 ) {
            errors.password = " Your password must be from 6 to 12 characters "
        }

        if (values.RePassword != values.password) {
            errors.RePassword = " RePassword must match with the password "
        }

        return errors;

     }

    // validationSchema: mySchema

} );

    return (
        <>
           <div className='w-75 m-auto p-5 '>


            { isSuccess ? <div className='alert alert-success text-center'> Welcome to Our Website</div> : ""}
            {errorMsg ? <div className='alert alert-danger text-center'> { errorMsg }</div> : ""}

             
            <h2 className='m-4'> Register Now: </h2>
             <form onSubmit= { myFormik.handleSubmit}>


             <label htmlFor="Name">Name:</label>
             <input onBlur={ myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.Name} id='Name' type="text" placeholder='Please enter your name' className='form-control mb-4' />
             {myFormik.errors.Name && myFormik.touched.Name ? <div className='alert alert-danger'>{myFormik.errors.Name}</div> : ""}


              <label htmlFor="email">Email:</label>
              <input onBlur={ myFormik.handleBlur} onChange={ myFormik.handleChange} value={myFormik.values.email} id='email' type="email" placeholder='Please enter your E-mail' className='form-control mb-4' />
              { myFormik.errors.email && myFormik.touched.email ? <div className='alert alert-danger'> {myFormik.errors.email}  </div> : "" }


              <label htmlFor="phone">Phone Number:</label>
              <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' type="text" placeholder='Please enter your Phone Number' className='form-control mb-4' />
              {myFormik.errors.phone && myFormik.touched.phone ? <div className='alert alert-danger'>{myFormik.errors.phone}</div> : ""}


              <label htmlFor="password">password:</label>
              <input onBlur={ myFormik.handleBlur} onChange={ myFormik.handleChange} value={myFormik.values.password} id='password' type="password" placeholder='Please enter your password' className='form-control mb-4' />
              { myFormik.errors.password && myFormik.touched.password ? <div className='alert alert-danger'> {myFormik.errors.Password}  </div> : "" }


              <label htmlFor="RePassword">RePassword:</label>
              <input onBlur={ myFormik.handleBlur} onChange={ myFormik.handleChange} value={myFormik.values.RePassword} id='RePassword' type="password" placeholder='Please enter your Re-Password' className='form-control mb-4' />
              { myFormik.errors.RePassword && myFormik.touched.RePassword ? <div className='alert alert-danger'> {myFormik.errors.RePassword}  </div> : "" }
 

              <button type='submit'  className='bg-main p-2 text-white rounded-3 btn'>  
               { isLoading ?  <Circles
             height="20"
             width="20"
             color="#fff"
             ariaLabel="circles-loading"
             wrapperStyle={{}}
             wrapperClass=""
             visible={true}
             /> : "Resiter"}
           
  </button>

             </form>
           </div>
        </>
    
    );
}

export default Register;

