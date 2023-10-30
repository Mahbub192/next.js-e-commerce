import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const Review = () => {
  const {
    reviewId,
    state: { products },
  } = useContext(AuthContext);

  // Find the product with the matching reviewId
  const product = products.find(
    (singleProduct) => singleProduct?._id === reviewId
  );
  console.log(17, product)

  return (
    <div className="space-y-3 pb-20">
      {product?.review?.map((review, index) => (
        <div className="w-2/4">
          <div key={index} className="flex gap-5 items-center">
            <div className="bg-gray-200 p-2 rounded-lg">
              <img
                className="w-16 rounded-full mx-auto "
                src={review?.userImage}
                alt=""
              />
              <p className="mt-2">{review?.userName}</p>
            </div>
            <div>
              <h1 className="text-lg font-serif">{review.review}</h1>
              <Rating
                style={{ maxWidth: 100 }}
                value={review.rating}
                readOnly
              />
            </div>
          </div>

          <div className="divider"></div>
        </div>
      ))}

      <h1 className="text-xl font-semibold">
        The product was awesome and of premium quality...! 👨‍🦱👌
      </h1>

      <div className="md:flex">
        <h3 className="text-[#606469] pt-2">Did you find this helpful?</h3>

        <div className="pt-2 ml-6">
          <button className="btn btn-sm btn-outline btn-info mr-4 px-4 rounded-2xl">
            YES
          </button>
          <button className="btn btn-sm btn-outline btn-info px-4 rounded-2xl">
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
