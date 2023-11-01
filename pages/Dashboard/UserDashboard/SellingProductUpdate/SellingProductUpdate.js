import { AuthContext } from "@/pages/providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";

const SellingProductUpdate = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  let email = user?.email;

  useEffect(() => {
    fetch(`api/sellProductsAPI?email=${email}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data));
  }, [email]);

  console.log(15, product)

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Sq.</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Shop Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
              <th>Customer Review</th>
              <th>Admin Review</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product?.map((singleProduct) => (
                <>
                  <tr className="mt-2">
                    <th>1</th>
                    <th>
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={singleProduct.imageUrl} />
                        </div>
                      </div>
                    </th>
                    <td>{singleProduct.productName}</td>
                    <th>{singleProduct.shopName}</th>
                    <td >{singleProduct.quantity}</td>
                    <th >{singleProduct.date}</th>
                    <td className={singleProduct.status === "pending" ? "bg-red-300" : "bg-green-400"}>{singleProduct.status}</td>
                    <td>...</td>
                    <td>...</td>
                    <td>
                      <button className="bg-blue-400 py-2 px-3 border-2 text-white font-semibold">Update</button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellingProductUpdate;
