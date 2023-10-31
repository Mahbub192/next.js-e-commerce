import React, { useContext } from "react";
import RootLayout from "../Layouts/RootLayout";
import { AuthContext } from "../providers/AuthProvider";
import SingleAddCart from "./SingleAddCart";

const cart = () => {
  const {
    localStorageData,  state: { cart, error, loading },
  } = useContext(AuthContext);
  // const scart=cart[0];
  // console.log(scart)
  
  const price = localStorageData?.map(price => price.price)
  const total = price?.reduce((acc, price) => acc + price, 0);
  console.log(total)

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>Something went wrong..!</p>;
  }
  if (!loading && !error && cart.length) {
    return <div className="flex">
        <div className="overflow-x-auto w-3/5 px-10">
        <table className="table">
          {/* head */}
          <thead >
            <tr className=" ml-20">
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              (content = localStorageData.map((product) => (
                <SingleAddCart
                  key={product._id}
                  scart={product}
                ></SingleAddCart>
              )))
            }
          </tbody>
        </table>
      </div>
      <div className="w-2/5 bg-gray-200 m-10   p-10 pt-0">
        <h1 className="text-center py-5 text-2xl ">Price</h1>
      {localStorageData.map((product) => 
       <div className="mt-2 bg-white shadow-xl py-3">
       <div className="flex justify-between items-center px-5">
        <div className="flex items-center gap-6">
        <img className="w-12 h-12 rounded-full" src={product.thumbnail}  alt="" />
          <p className="font-semibold">{product.title}</p>
        </div>
        <h3 className="font-semibold text-lg">{product.price}</h3>
        {/* <p>{product.thumbnail}</p> */}
       </div>
       </div>

      )}
       <div className="divider"></div>
       <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold ">Total: </h1>
        <h1 className="text-xl font-semibold "> taka : {total} </h1>
       </div>
       <div className="text-center mt-10">
        <button className="text-white bg-green-600 px-6 py-3 rounded-lg text-xl">Payment</button>
       </div>
      </div>
    </div>
    
      
    
  }

  // return <div className="min-h-screen">{content}</div>;
};

export default cart;
// useCommonLayout
cart.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
