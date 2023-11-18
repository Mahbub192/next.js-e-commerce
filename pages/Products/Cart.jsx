import React, { useContext, useEffect, useState } from "react";
import RootLayout from "../Layouts/RootLayout";
import { AuthContext } from "../providers/AuthProvider";
import SingleAddCart from "./SingleAddCart";

const cart = () => {
  const {
    localStorageData,
    removeFromCart,
    state: { cart, error, loading },
  } = useContext(AuthContext);
  const [isChecked, setChecked] = useState(false);
  const [singleChecked, setSingleChecked] = useState(true);
  const [totalProduct, setTotalProduct] = useState(localStorageData);
  const [totalPrice, setTotalPrice] = useState();
  const [checkedItems, setCheckedItems] = useState({});
  

  let price = localStorageData?.map((price) => price?.price);
  let total = price?.reduce((acc, price) => acc + price, 0);

  useEffect(() => {
    setTotalProduct(localStorageData);
    setTotalPrice(total);
  }, [localStorageData, total]);

  const handleCheckBox = (id) => {
    const itemIndex = totalProduct?.findIndex((item) => item?._id === id);
  
    if (itemIndex !== -1) {
      // Item exists, remove it
      const updatedData = totalProduct?.filter((item) => item._id !== id);
      console.log(updatedData);
      setTotalProduct(updatedData);
      price = updatedData?.map((price) => price?.price);
      total = price?.reduce((acc, price) => acc + price, 0);
      setTotalPrice(total);
    } else {
      // Item doesn't exist, add it
      const newItem = localStorageData?.find((item) => item._id === id);
      const updatedData = [...totalProduct, newItem];
      console.log(updatedData);
      setTotalProduct(updatedData);
      price = updatedData?.map((price) => price?.price);
      total = price?.reduce((acc, price) => acc + price, 0);
      setTotalPrice(total);
    }
  
    setSingleChecked((prevSingleChecked) => !prevSingleChecked); // Toggle the singleChecked state
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
    console.log(52, checkedItems);
  };

  
  const handleCheckBoxAll = () => {
    setChecked(!isChecked);
    setSingleChecked(true);
    setTotalProduct(localStorageData);
    setTotalPrice(total);
  };
  let content;

  if (loading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>Something went wrong..!</p>;
  }
  if (!loading && !error && cart.length) {
    return (
      <div className="flex">
        <div className="overflow-x-auto w-3/5 px-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr className=" ml-20">
                <th>
                  <label>
                    <input
                      onClick={handleCheckBoxAll}
                      type="checkbox"
                      className="checkbox"
                      checked={isChecked}
                    />
                  </label>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                (content = localStorageData?.map((product) => (
                  <SingleAddCart
                    key={product?._id}
                    handleCheckBox={handleCheckBox}
                    checkItem={checkedItems[product?._id] }
                    scart={product}
                    singleChecked={singleChecked}
                    setSingleChecked={setSingleChecked}
                    removeFromCart={removeFromCart}
                  />
                )))
              }
            </tbody>
          </table>
        </div>
        <div className="w-2/5 bg-gray-200 m-10   p-10 pt-0">
          <h1 className="text-center py-5 text-2xl ">Checkout your order</h1>
          {totalProduct.map((product) => (
            <div className="mt-2 bg-white shadow-xl py-3">
              <div className="flex justify-between items-center px-5">
                <div className="flex items-center gap-6">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={product?.thumbnail}
                    alt=""
                  />
                  <p className="font-semibold">{product?.title}</p>
                </div>
                <h3 className="font-semibold text-md">{product?.price} Tk</h3>
                {/* <p>{product.thumbnail}</p> */}
              </div>
            </div>
          ))}
          <div className="divider"></div>
          <div className="flex items-center justify-between">
            <select className="select select-bordered w-full max-w-xs text-lg">
              <option disabled selected>
                Pick your courier service
              </option>
              <option>Sundarban Courier Service</option>
              <option>Pathao Couriers</option>
              <option>RedX.</option>
              <option>Delivery Tiger</option>
              <option>Pathao Courier</option>
              <option>Karatoa Courier Service </option>
              <option>Janani Express Parcel Service</option>
            </select>

            <h1 className="text-2xl font-semibold ">
              {" "}
              Total : {totalPrice} Tk{" "}
            </h1>
          </div>
          <div className="text-center mt-10">
            <button className="text-white bg-green-600 px-6 py-3 rounded-lg text-2xl">
              Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // return <div className="min-h-screen">{content}</div>;
};

export default cart;
// useCommonLayout
cart.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
