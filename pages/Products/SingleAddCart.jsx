// SingleAddCart.js
import React from "react";

const SingleAddCart = ({
  scart,
  removeFromCart,
  handleCheckBox,
  checkboxes,
  index
}) => {
  console.log(11, checkboxes)
  return (
    <tr>
      <td>
        <label>
        <input
            onClick={() => handleCheckBox(scart?._id, index)}
            type="checkbox"
            className="checkbox"
            checked={checkboxes[index]}
          />
        </label>
      </td>
      <td>
        <div className="flex items-center space-x-3  ">
          <div className="avatar  ">
            <div className="mask mask-squircle w-20 h-20">
              <img src={scart?.thumbnail} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-semibold">
              {scart?.description?.slice(0, 20)}
            </div>
            <div className="text-sm opacity-50">
              Available Stock :{" "}
              <span className="text-red-700 text-lg">{scart?.stock}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="font-bold">{scart?.title}</td>
      <td className="text-lg font-semibold">
        Price: <span className="text-orange-600"> {scart?.price}</span>$
      </td>
      <th>
        <button
          onClick={() => removeFromCart(scart?._id)}
          className="btn btn-accent btn-xs"
        >
          Remove
        </button>
      </th>
    </tr>
  );
};

export default SingleAddCart;
