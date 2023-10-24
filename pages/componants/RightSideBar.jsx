import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import Link from "next/link";
import { AuthContext } from "../providers/AuthProvider";

const RightSideBar = () => {
  const {
    state: { products, error, loading },
  } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-center text-xl font-semibold">
        🏴󠁧󠁢󠁷󠁬󠁳󠁿 Most Selling Produce{" "}
      </h1>
      <div className="">
        {products &&
          products
            .filter((singleProduct) => singleProduct.rating >= 4.5)
            .map((singleProduct) => (
              <>
                <div
                  key={singleProduct._id}
                  className="flex mt-3 bg-gray-200 p-3 items-center gap-5"
                >
                  <div className="bg-white">
                    <img
                      className="w-20 h-20 object-contain p-1"
                      src={singleProduct?.thumbnail}
                      alt=""
                    />
                  </div>
                  <div>
                    <h1>
                      <span className="font-semibold">Title: </span>{" "}
                      {singleProduct.title.length > 20
                        ? singleProduct.title.slice(0, 20) + "..."
                        : singleProduct.title}
                    </h1>
                    <p>
                      {" "}
                      <span className="font-semibold">Price: </span>
                      {singleProduct.price}
                    </p>
                    <Rating
                      style={{ maxWidth: 90 }}
                      value={singleProduct.rating}
                      readOnly
                    />
                    <Link href={`/Products/${singleProduct._id}`}>
                      {" "}
                      <button className="px-2 py-1 bg-blue-500 text-white mt-2 rounded-lg">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ))}
      </div>
    </div>
  );
};

export default RightSideBar;
