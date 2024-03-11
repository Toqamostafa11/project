import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../img/freshcart-logo.svg';
import { AuthContext } from '../../Context/AuthContext';


const Navbar = () => {
  // Assuming you have a context called AuthContext
  // const AuthContext = React.createContext();
const { myToken , test } = useContext(AuthContext);
const navigate =useNavigate ();

console.log( "Token: ", myToken);

function logout(){
 test(null);
 localStorage.removeItem("tkn");
navigate('/Login')

}

  return (
    <AuthContext.Provider value={null}>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Register">
            <img src={logo} alt="Fresh Cart" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
           {myToken ?  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Products">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Carts">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Brands">Brands</Link>
              </li>
            </ul>: ""}
           

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
     
              <li className="nav-item">
                <ul className=''>
                  <li className='me-3 fa-brands fa-instagram'></li>
                  <li className='me-3 fa-brands fa-facebook'></li>
                  <li className='me-3 fa-brands fa-linkedin'></li>
                  <li className='me-3 fa-brands fa-twitter'></li>
                  <li className='me-3 fa-brands fa-youtube'></li>
                  <li className='me-3 fa-brands fa-tiktok'></li>
                </ul>
              </li>

              {myToken ?        <li className="nav-item">
                <span onClick={logout} role='button' className="nav-link active" aria-current="page">Log out</span>
              </li> : 
              <>   <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Register">Register</Link>
              </li> </>}




            </ul>
          </div>
        </div>
      </nav>
    </AuthContext.Provider>
  );
};

export default Navbar;