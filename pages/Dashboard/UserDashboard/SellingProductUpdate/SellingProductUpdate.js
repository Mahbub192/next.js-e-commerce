import { AuthContext } from "@/pages/providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SellProducts from "../SellProducts/SellProducts";
import LoadingPage from "@/pages/LoadingPage/LoadingPage";

const SellingProductUpdate = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [modalFromVisible, setModalFromVisible] = useState(false);
  const [loading, setLoading] = useState(true)
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


  async function fetchData() {
    try {
      const response = await fetch(`api/sellProductsAPI?email=${email}`);
      const data = await response.json();
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [email]);

  console.log(15, product)

  if(loading){
    return <div className="">
      <LoadingPage ></LoadingPage>
    </div>
  }

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
              <th>Price</th>
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
                          <img src={singleProduct?.images[0]} />
                        </div>
                      </div>
                    </th>
                    <td>{singleProduct?.title}</td>
                    <th>{singleProduct?.shopName}</th>
                    <td >{singleProduct?.stock}</td>
                    <td>{singleProduct?.price}</td>
                    <th >{singleProduct.date}</th>
                    <td className={singleProduct.status === "pending" ? "bg-red-300" : "bg-green-400"}>{singleProduct.status}</td>
                    <td>...</td>
                    <td>{singleProduct.comment}</td>
                    <td>
                      <button onClick={()=>showModal(singleProduct._id)} className={singleProduct.status === "pending" ? "bg-blue-400 py-2 px-3 border-2 text-white   font-semibold" : "bg-gray-400 px-3 py-2 border-2 text-white " } 
                       disabled ={singleProduct.status === "pending" ? false : true}>Update</button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
      {modalFromVisible && (
        <dialog className="modal" open>
          <div className="modal-box w-11/12 max-w-5xl">
            <h1 className="text-xl font-semibold font-serif mb-10">
            Update this Product
            </h1>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
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
            </form> */}
            <SellProducts id={productId} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeFromModal}>Close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default SellingProductUpdate;
