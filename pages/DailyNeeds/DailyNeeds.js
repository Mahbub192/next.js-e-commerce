import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../providers/AuthProvider";

const DailyNeeds = () => {
  const {
    state: { products, error, loading },
  } = useContext(AuthContext);
  const dailyProduct = products?.filter(
    (singleProduct) => singleProduct.category == "Health & Beauty"

  );
  console.log(8, products);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="container mx-auto bg-gray-300 p-10 mb-10">
      <div>
        <h1 className="text-xl font-bold underline italic font-serif">Health & Beauty</h1>
      </div>
      <div>
        <Slider {...settings}>
          {dailyProduct?.map((singleProduct) => (
            <div className="mt-5">
              <div>
                <img className="bg-white h-36 w-36 object-cover" src={singleProduct?.images[0]} alt="" />
                <p className="mt-3"><span className="italic pr-3">Brand:</span>{singleProduct?.brand}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DailyNeeds;
