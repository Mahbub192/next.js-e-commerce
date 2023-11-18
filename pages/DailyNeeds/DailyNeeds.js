import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../providers/AuthProvider";
import Link from "next/link";

const DailyNeeds = () => {
  const {
    state: { products, error, loading },
  } = useContext(AuthContext);
  const healthBeauty = products?.filter(
    (singleProduct) => singleProduct.category == "Health & Beauty"
  );
  const dailyNeed = products?.filter(
    (singleProduct) => singleProduct.category == "Daily Needs"
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
    <div>
      <div className="container mx-auto bg-gray-300 p-10 mb-10 rounded-xl">
        <div>
          <h1 className="text-xl font-bold underline italic font-serif">
            Health & Beauty
          </h1>
        </div>
        <div>
          <Slider {...settings}>
            {healthBeauty?.map((singleProduct) => (
              <div className="mt-5">
                <Link href={`/Products/${singleProduct?._id}`}>
                  <div>
                    <img
                      className="bg-white h-36 w-36 object-cover"
                      src={singleProduct?.images[0]}
                      alt=""
                    />
                    <p className="mt-3">
                      <span className="italic pr-3">Brand:</span>
                      {singleProduct?.brand}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="container mx-auto bg-gray-300 p-10 mb-10 rounded-xl">
        <div>
          <h1 className="text-xl font-bold underline italic font-serif">
          Daily Needs
          </h1>
        </div>
        <div>
          <Slider {...settings}>
            {dailyNeed?.map((singleProduct) => (
              <div className="mt-5">
                <Link href={`/Products/${singleProduct?._id}`}>
                  <div>
                    <img
                      className="bg-white h-36 w-36 object-cover"
                      src={singleProduct?.images[0]}
                      alt=""
                    />
                    <p className="mt-3">
                      <span className="italic pr-3">Brand:</span>
                      {singleProduct?.brand}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default DailyNeeds;
