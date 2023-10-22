import React, { useContext, useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { AuthContext } from "@/pages/providers/AuthProvider";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems]= useState([])
  let email = user?.email;

  useEffect(() => {
    const allBuyItem = async () => {
      const res = await fetch(`/api/buyProduct?email=${email}`);
      const data = await res.json();
      setItems(data.data);
    };
    allBuyItem();
  }, email);
  return (
    <div className="w-5/6 mx-auto shadow-xl bg-white p-10">
      <div className="mb-10">
        <h1 className="text-lg font-semibold">
          Total Processing Product:{" "}
          <span className="text-xl font-bold">500</span>
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Discount Percentage</th>
              <th>Order Date</th>
              <th>Quantity</th>              
              <th>Product Information </th>
              <th>Review</th>
              <th>Fide back</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { items &&
              items.map((item) => <SingleProduct key={item._id} item={item} ></SingleProduct>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
