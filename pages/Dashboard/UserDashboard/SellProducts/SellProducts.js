import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import {
  FaLocationDot,
  FaPhone,
  FaRegImages,
  FaUser,
  FaUserGroup,
} from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
import ImageUploadForm from "./ImageUploadForm";
import Swal from "sweetalert2";
import  { AuthContext } from "@/pages/providers/AuthProvider";

const SellProducts = () => {
  const {user} = useContext(AuthContext)
  const [ImageUrl, setImageUrl] = useState([]);
  let email;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const productInfo = {
      productName: data.name,
      shopName: data.shopName,
      location: data.location,
      category: data.category,
      phoneNumber: data.phoneNumber,
      imageUrl: ImageUrl,
      message: data.message,
      status: "pending",
      quantity: data.quantity,
    };
    console.log(productInfo);
    const response = await fetch(`api/sellProductsAPI`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productInfo),
    });
    const responseData = await response.json();
    if (responseData.data.acknowledged) {
      reset();
      Swal.fire({
        icon: "success",
        title: "Product added successfully in database.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(()=>{
    email=user?.email;
  },[user])

  return (
    <div className="w-3/5 mx-auto bg-white p-10 shadow-2xl">
      <h1 className="text-2xl front-bold">Product Details</h1>
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Owner Name  and Shop Name Input filed */}
        <div className="flex flex-wrap justify-around gap-6 ">
          <div className="form-control w-2/5">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <FaUser /> <span className="pl-2">Owner Name *</span>
              </span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              placeholder="Owner Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-2/5">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <BsShop /> <span className="pl-2">Shop Name</span>
              </span>
            </label>
            <input
              type="text"
              {...register("shopName", { required: true })}
              name="shopName"
              placeholder="Shop Name"
              className="input input-bordered"
            />
          </div>
        </div>
        {/* Product Number and Product Category Input filed */}
        <div className="flex flex-wrap justify-around gap-6 mt-5">
          <div className="form-control w-2/5">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <MdProductionQuantityLimits />{" "}
                <span className="pl-2">Product Name</span>
              </span>
            </label>
            <input
              type="text"
              {...register("location", { required: true })}
              name="location"
              placeholder="Location"
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-2/5">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <MdProductionQuantityLimits />{" "}
                <span className="pl-2">Product Category </span>
              </span>
            </label>
            <select {...register("category")} className="input input-bordered">
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Men's & Boy's Fashion">
                Men's & Boy's Fashion
              </option>
              <option value="Electronic Device">Electronic Device</option>
              <option value="Sports & Outdoor">Sports & Outdoor</option>
              <option value="Home & Lifestyle">Home & Lifestyle</option>
              <option value="Groceries">Groceries</option>
              <option value="Girl's Fashion">Girl's Fashion</option>
              <option value="Vehicle & Accessories">
                Vehicle & Accessories
              </option>
              <option value="Kids Fashion">Kids Fashion</option>
              <option value="All Categories">All Categories</option>
            </select>
          </div>
        </div>
          
        {/* Phone Number and Location Input filed */}
        <div className="flex flex-wrap justify-around gap-6 mt-5">
          <div className="form-control w-2/5">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <MdProductionQuantityLimits />{" "}
                <span className="pl-2">Product Quantity *</span>
              </span>
            </label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              name="quantity"
              placeholder="01"
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-2/5">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <FaPhone /> <span className="pl-2">Phone Number</span>
              </span>
            </label>
            <input
              type="number"
              {...register("phoneNumber", { required: true })}
              name="phoneNumber"
              placeholder="01********"
              className="input input-bordered"
            />
          </div>
        </div>
        <div>
          <div className="md:mx-10 mt-5">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <FaRegImages />{" "}
                <span className="pl-2">Select Product Image More then 3 *</span>
              </span>
            </label>
            <div>
              <ImageUploadForm ImageUrl={ImageUrl} setImageUrl={setImageUrl} />
            </div>
          </div>
        </div>
        <div className="form-control mx-10">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <FaLocationDot /> <span className="pl-2">Location</span>
              </span>
            </label>
            <input
              type="text"
              {...register("location", { required: true })}
              name="location"
              placeholder="Location"
              className="input input-bordered"
            />
          </div>

        <div className="">
          <div className="form-control  md:mx-10 mt-4">
            <label className="label ">
              <span className="label-text flex items-center">
                {" "}
                <AiOutlineMail /> <span className="pl-2">Message</span>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered textarea-lg w-full "
              type="text"
              {...register("message", { required: true })}
              name="message"
              placeholder="Message"
            ></textarea>
          </div>
        </div>
        <button
          className={`mt-16 mx-auto border-2 px-10 py-2 text-lg md:text-xl font-bold ${
            ImageUrl.length === 0
              ? "bg-red-300 text-gray-300"
              : "bg-blue-500 hover:bg-blue-800 text-white"
          }  `}
          type="submit"
          disabled={ImageUrl.length === 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SellProducts;
