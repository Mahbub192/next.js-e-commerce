import { AuthContext } from "@/pages/providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";

const ProductsStatusChange = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [status , setStatus] = useState()
  let email = user?.email;

  useEffect(() => {
    fetch(`api/sellProductsAPI`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data));
  }, [email]);

  console.log(15, product);

  const handleStatus = (id, status) => {
    const info = {
      id,
      status,
    };

    fetch("api/sellProductsAPI", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        // setStatus(data.data.status)
        console.log(data);
      });
  };

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
                    <td>{singleProduct.quantity}</td>
                    <th>{singleProduct.date}</th>
                    <td className="flex gap-3">
                      <span
                        className={
                          singleProduct.status === "pending"
                            ? "text-red-500 text-lg px-2 py-1"
                            : "text-green-500 text-lg"
                        }
                      >
                        {singleProduct.status}
                      </span>
                      <button
                        className="bg-green-400 px-2 py-1 border-2"
                        onClick={() =>
                          handleStatus(
                            singleProduct._id,
                            singleProduct.status === "pending"
                              ? "Done"
                              : "Pending"
                          )
                        }
                      >
                        Update status
                      </button>
                    </td>
                    <td>
                      <button className="bg-blue-400 py-2 px-3 border-2 text-white font-semibold">
                        Update
                      </button>
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

export default ProductsStatusChange;
