import axios from 'axios';
import { useFormik } from 'formik';
import React, {  useContext, useState }  from 'react';
import  { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';



const Login = () => {


    const userData = {
        email: "",
        password: "",
    };

const [isSuccess, setisSuccess] = useState(false);
const [errorMsg, seterrorMsg] = useState(undefined);
const [isLoading, setisLoading] = useState(false);


const navigate = useNavigate();
const { test } = useContext( AuthContext );



    async function onSubmit(values){
        
        console.log("Submited",values);
       
        setisLoading (true);

        await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signin` ,values ) 

         .then( (x) =>{ 

            if( x.data.message == "success" ) {
                // console.log("Tokenn", x.data.token);
                localStorage.setItem("tkn" , x.data.token);
                test ( x.data.token );             
                setisSuccess( true );

                setTimeout ( function(){
                    setisSuccess( false ); 
                    navigate('/Products');
                    
                },2000 ) ;
                setisLoading (false);
            }
        
        
         })
         .catch( (x) =>{
            console.log("in case of err: x", x.data.message);
            seterrorMsg(x.data.message)
            setTimeout(function(){
             seterrorMsg( false )} , 2000);
         } )
 

    }
     
 
    const myFormik = useFormik( {
     initialValues: userData,
     onSubmit: onSubmit,

     validate: function( values ){

        const errors ={};




        if ( values.email.includes( '@') !== true || values.email.includes( '.' ) !== true) {
            errors.email = " Your Email must be in format";
        }

     

        if (values.password.length < 6 || values.password.length > 20 ) {
            errors.password = " Your password must be from 6 to 12 characters "
        }

     

        return errors;

     }

    // validationSchema: mySchema

} );

    return (
        <>
           <div className='w-75 m-auto p-5 '>


            { isSuccess ? <div className='alert alert-success text-center'> Welcome Backk </div> : ""}
            {errorMsg ? <div className='alert alert-danger text-center'> { errorMsg }</div> : ""}

             
            <h2 className='m-4'> Login Now: </h2>
             <form onSubmit= { myFormik.handleSubmit}>



              <label htmlFor="email">Email:</label>
              <input onBlur={ myFormik.handleBlur} onChange={ myFormik.handleChange} value={myFormik.values.email} id='email' type="email" placeholder='Please enter your E-mail' className='form-control mb-4' />
              { myFormik.errors.email && myFormik.touched.email ? <div className='alert alert-danger'> {myFormik.errors.email}  </div> : "" }


              <label htmlFor="password">Password:</label>
              <input onBlur={ myFormik.handleBlur} onChange={ myFormik.handleChange} value={myFormik.values.password} id='password' type="password" placeholder='Please enter your Password' className='form-control mb-4' />
              { myFormik.errors.password && myFormik.touched.password ? <div className='alert alert-danger'> {myFormik.errors.password}  </div> : "" }



              <button type='submit'  className='bg-main p-2 text-white rounded-3 btn'>  
               { isLoading ?  <Circles
             height="20"
             width="20"
             color="#fff"
             ariaLabel="circles-loading"
             wrapperStyle={{}}
             wrapperClass=""
             visible={true}
             /> : "Login"}
           
  </button>

             </form>
           </div>
        </>
    
    );
}

export default Login;


