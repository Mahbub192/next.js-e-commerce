import React from "react";

const RecentOrders = ({ matchedDates }) => {
  return (
    <div className="mt-10 w-4/6 mx-auto p-8 bg-white">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-bold">Recent Orders</h1>
        <button className="text-blue-400 underline border-none">
          View All
        </button>
      </div>
      {/* table part */}
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>UserName</th>
              <th>Product Name</th>
              <th>Product Id</th>
              <th>Price</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {matchedDates?.map((singleProduct) => (
              <tr key={singleProduct?._id}>
                <td>{singleProduct?.userName}</td>
                <td>{singleProduct?.title}</td>
                <td>{singleProduct?.id}</td>
                <td>$ {singleProduct?.price}</td>
                <td>
                  <button>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
