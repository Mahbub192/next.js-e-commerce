import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const UserMostSellingCategory = ({items}) => {
    console.log(7, items)
    const data = items?.map((singleItem) => ({
        name: singleItem.title, value: singleItem.price 
      }));
  return (
    <div className="bg-white p-5 mt-10">
      <h1 className="text-3xl font-bold mb-5">Most Buying Product</h1>
      <PieChart width={680} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default UserMostSellingCategory;
