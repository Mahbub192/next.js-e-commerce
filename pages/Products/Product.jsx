import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { actionTypes } from "../states/productState/ActionTypes";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const Product = ({ product }) => {

  const { dispatch ,filterAddCart} = useContext(AuthContext);

  return (
    <div>
      <div className=" overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="px-4 py-2">
          <h1 className="text-xl font-semibold text-gray-800  dark:text-white">
            {product?.title?.slice(0, 20)}
          </h1>
        </div>

        <div className="flex items-center justify-center py-4 bg-[#EDF2FD]">
          <img
            className=" object-cover  w-48 h-40  mt-2 "
            src={product?.images[0]}
            alt="NIKE AIR"
          />
        </div>
        <div className="flex my-2 item-center">
          <svg
            className="w-5 h-5 text-orange-500 fill-current dark:text-gray-300"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>

          <svg
            className="w-5 h-5 text-orange-500 fill-current dark:text-gray-300"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>

          <svg
            className="w-5 h-5 text-orange-400 fill-current dark:text-gray-300"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>

          <svg
            className="w-5 h-5 text-orange-300 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>

          <svg
            className="w-5 h-5 text-orange-100 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
          <p className="text-gray-500 pl-4 text-sm">{product?.rating}</p>
        </div>

        <div className="flex items-center justify-between px-4 py-2 bg-accent">
          <h1 className="text-lg font-bold text-white">$ {product?.price}</h1>

          <Link href={`/Products/${product?._id}`}>
            <button className="btn btn-xs  btn-primary text-white">
              Buy Now
            </button>
          </Link>

          <button
            onClick={() =>{
              // filterAddCart(_id);
              dispatch({ type: actionTypes.ADD_TO_CARD, payload: product } )
            }
            }
            className="btn btn-xs  btn-primary text-white"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <Toaster />

    </div>

    //
  );
};

export default Product;
