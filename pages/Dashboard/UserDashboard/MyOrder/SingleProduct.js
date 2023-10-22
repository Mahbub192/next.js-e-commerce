import React from "react";

const SingleProduct = (item) => {
  console.log();
  const {
    id,
    email,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
    formattedDate,
  } = item.item;
  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={images[0]} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </td>
      <td>{brand}</td>
      <td>{title}</td>
      <th>{price}</th>
      <th>{discountPercentage}</th>
      <th>{formattedDate}</th>
      <th>02</th>
      <th>{description}</th>
      <th>{rating}</th>
      <th></th>
      <th><button className="px-5 py-2 bg-blue-500 rounded-xl text-white">View</button></th>
      <th><button className="px-5 py-2 bg-red-400 rounded-xl text-white">Return</button></th>
    </tr>
  );
};

export default SingleProduct;
