import { AuthContext } from "@/pages/providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ProductsStatusChange = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [status , setStatus] = useState()
  const [modalFromVisible, setModalFromVisible] = useState(false);
  const [productId, setProductId] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let email = user?.email;

  

  const showModal = (id) => {
    setProductId(id)
    setModalFromVisible(true);
  };

  const closeFromModal = () => {
    setModalFromVisible(false);
  };


  const onSubmit = async(data) => {
    const adminReview ={
       id: productId,
       comment: data.review}
    const response = await fetch(`api/sellProductsAPI`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminReview),
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Your review add successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      closeFromModal(); // Close the review modal after submission
    }
  };


  useEffect(() => {
    fetch(`api/sellProductsAPI`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data)
      });
      
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
        if (data.data.matchedCount > 0) {
          setStatus("Done")
          Swal.fire({
            icon: "success",
            title: "Your review add successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
                    <td>{singleProduct.title}</td>
                    <th>{singleProduct.shopName}</th>
                    <td>{singleProduct.stock}</td>
                    <th>{singleProduct.date}</th>
                    <td className="flex gap-3">
                      <span
                        className={
                          singleProduct.status === "pending"
                            ? "text-red-500 text-lg px-2 py-1"
                            : "text-green-500 text-lg"
                        }
                      >
                        {status == undefined ? singleProduct.status : status}
                      </span>
                      <button
                      className={
                        singleProduct.status === "pending"
                          ? "bg-green-400 px-2 py-1 border-2"
                          : "bg-red-300 px-2 py-1 border-2"
                      }
                        onClick={() =>
                          handleStatus(
                            singleProduct._id,
                            singleProduct.status === "pending"
                              ? "Done"
                              : "Pending"
                          )
                        }
                        disabled ={singleProduct.status == 'Done' ? true : false}
                      >
                        Update status
                      </button>
                    </td>
                    <td>
                      <button onClick={()=>showModal(singleProduct._id,)} className="bg-blue-400 py-2 px-3 border-2 text-white font-semibold">
                        Update
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
      {modalFromVisible && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h1 className="text-xl font-semibold font-serif mb-10">
            Feedback for this Product
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* include validation with required or other standard HTML validation rules */}
              <textarea
                className="textarea textarea-bordered w-full h-32"
                placeholder="Message"
                {...register("review", { required: true })}
              />
              {errors.review && <span>This field is required</span>}
              <input
                className="border-2 py-1 px-4 text-lg mt-5 bg-blue-400 text-white cursor-pointer"
                type="submit"
              />
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeFromModal}>Close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ProductsStatusChange;
