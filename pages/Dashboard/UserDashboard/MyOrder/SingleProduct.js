import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import StarsRating from "./StarsRating";
import { AuthContext } from "@/pages/providers/AuthProvider";

const SingleProduct = (item) => {
  const { user,loading } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFromVisible, setModalFromVisible] = useState(false);
  const [starsRatingValue, setStarsRatingValue] = useState();
  const [productId, setProductId] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    formattedDate,
    images,
  } = item.item;

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const showReviewModal = (id) => {
    setModalFromVisible(true);
    setProductId(id);
  };

  const closeReviewModal = () => {
    setModalFromVisible(false);
  };


  const onSubmit = (data) => {
    const productReview = {
      review : data?.review, 
      rating : starsRatingValue,
      productId,
      userImage: user?.photoURL , 
      userName: user?.displayName
    }
    console.log(productReview); // You can handle the review submission here with productId
    closeReviewModal(); // Close the review modal after submission
  };

  return (
    <>
      <tr>
        <td>
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={images[0]} alt="Product Image" />
            </div>
          </div>
        </td>
        <td>{brand}</td>
        <td>{title}</td>
        <th>{price}</th>
        <th>{discountPercentage}</th>
        <td>{formattedDate}</td>
        <td>02</td>
        <td>
          {description.length > 30
            ? description.slice(0, 30) + "..."
            : description}
        </td>
        <td>{rating}</td>
        <td>
          <button
            className="px-2 py-2 bg-orange-200 rounded-xl"
            onClick={() => showReviewModal(id)}
          >
            Review
          </button>
        </td>

        <td>
          <button
            className="px-5 py-2 bg-blue-500 rounded-xl text-white"
            onClick={showModal}
          >
            View
          </button>
        </td>
        <td>
          <button className="px-5 py-2 bg-red-400 rounded-xl text-white">
            Return
          </button>
        </td>
      </tr>

      {modalVisible && (
        <dialog className="modal" open>
          <div className="modal-box w-11/12 max-w-5xl p-10">
            <button className="modal-close" onClick={closeModal}>
              <span className="text-3xl font-bold">✕</span>
            </button>
            <img className="w-60 mx-auto" src={images[0]} alt="" />
            <div>
              <p className="">Brand: {brand}</p>
              <p className="">Title: {title}</p>
              <p className="">Price: ${price}</p>
              <p className="">Discount: {discountPercentage}</p>
              <p className="">Date: {formattedDate}</p>
              <p className="">Quantity: 02</p>
              <p className="">Description: {description}</p>
              <p className="">Rating: {rating}</p>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>Close</button>
          </form>
        </dialog>
      )}

      {modalFromVisible && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h1 className="text-xl font-semibold font-serif mb-10">
              Add Review and Rating
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* include validation with required or other standard HTML validation rules */}
              <textarea
                className="textarea textarea-bordered w-full h-32"
                placeholder="Message"
                {...register("review", { required: true })}
              />
              {errors.review && <span>This field is required</span>}
              <div className="flex gap-10 items-center">
                {" "}
                <StarsRating setStarsRatingValue={setStarsRatingValue} />{" "}
                <span>
                  {starsRatingValue ? "Rating " + starsRatingValue : ""}
                </span>
              </div>
              <input
                className="border-2 py-1 px-4 text-lg mt-5 bg-blue-400 text-white"
                type="submit"
              />
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeReviewModal}>Close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default SingleProduct;
