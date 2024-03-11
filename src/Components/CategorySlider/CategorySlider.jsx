// import axios from "axios";
// import React, { useState , useEffect }  from "react";
// import { CirclesWithBar } from "react-loader-spinner";
// // import { useQuery } from "react-query";


// import Slider from "react-slick";

// export default function CategorySlider() {

// // function getCategories(){
// // return  axios.get("https://ecommerce.routemisr.com/api/v1/categories")

// // }

// async function getCategories(){
//   axios.get('https://ecommerce.routemisr.com/api/v1/products', )
//    .then((res) => {
//     CategorySlider(res.data.data);
//     console.log(res.data.data);
 
//    })
//    .catch((err ) => {
//      console.log("error",err);
 
//    })
   
//    }


//    useEffect( ()=>{
//     getCategories(); 
//   }, []);
 
//    const [data, isLoading] = useState('categorySlider', getCategories);

// // const {data, isLoading}= useQuery( 'categorySlider', getCategories )

//  return
 
//  {getCategories ?}
//  <div className='d-flex vh-100 bg-white bg-opacity-50 justify-content-center align-items-center'>
//   <CirclesWithBar
// height="100"
// width="100"
// color="#4fa94d"
// outerCircleColor="#4fa94d"
// innerCircleColor="#4fa94d"
// barColor="#4fa94d"
// ariaLabel="circles-with-bar-loading"
// wrapperStyle={{}}
// wrapperClass=""
// visible={true}
// />

// </div>

//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//   return (
//     <Slider {...settings}>
//       <div>
//         <h3>1</h3>
//       </div>
//       <div>
//         <h3>2</h3>
//       </div>
//       <div>
//         <h3>3</h3>
//       </div>
//       <div>
//         <h3>4</h3>
//       </div>
//       <div>
//         <h3>5</h3>
//       </div>
//       <div>
//         <h3>6</h3>
//       </div>
//     </Slider>
//   );
// }

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategories(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-white bg-opacity-50 justify-content-center align-items-center">
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

  return (
    <Slider {...settings}>
      {categories.map((category, idx) => (
        <div key={idx} className="text-center container overflow-hidden">
          <img
            style={{ height: "200px" }}
            className="w-100"
            src={category.image}
            alt={category.name}
          />
          <p>{category.name} </p>
        </div>
      ))}
    </Slider>
  );
}
 
