import React, { useContext, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import SalesStatics from "./SalesStatics/SalesStatics";
import MostSellingCategory from "./MostSellingCategory/MostSellingCategory";
import Transactions from "./Transactions/Transactions";
import RecentOrders from "./RecentOrders/RecentOrders";
import { AuthContext } from "@/pages/providers/AuthProvider";
import UserMostSellingCategory from "../UserDashboard/UserMostSellingCategory/UserMostSellingCategory";

const AdminDashboard = () => {
  const {
    user,
    state: { cart, products },
  } = useContext(AuthContext);
  const [allUser, setAllUser] = useState([]);
  const [items, setItems] = useState([]);
  const [matchedDates, setMatchedDates] = useState([]);

  useEffect(() => {
    const getAllUser = () => {
      fetch("/api/userAccountCreate")
        .then((res) => res.json())
        .then((data) => {
          setAllUser(data.data);
        });
    };
    getAllUser();
  }, []);

  let email = user?.email;
  useEffect(() => {
    const allBuyItem = async () => {
      const res = await fetch(`/api/buyProduct`);
      const data = await res.json();
      setItems(data.data);
    };
    allBuyItem();
  }, [email]);

  useEffect(() => {
    // Function to compare current date with array dates
    const compareDates = () => {
      const currentDate = new Date();
      const formattedCurrentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      const matches = items?.filter(date => date.formattedDate === formattedCurrentDate);
      setMatchedDates(matches);
    };
    compareDates();
  }, [items]);

  console.log("matchedDates", matchedDates)

  const price = items?.map((price) => price?.price);
  const total = price?.reduce(
    (acc, price) => parseFloat(acc) + parseFloat(price),
    0
  );
  // console.log(47, total)

  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold mb-3">Dashboard</h1>
        <p className="text-lg tracking-wide">Welcome to your dashboard</p>
      </div>
      <div className="flex flex-wrap gap-6 md:gap-12 mt-10">
        <div className="w-full md:w-1/5">
          <div className="flex justify-between items-center border-2 border-gray-300 p-5 bg-white">
            <div>
              <h1 className="text-xl font-bold">{allUser.length}</h1>
              <p>Total Users</p>
            </div>
            <p className="text-2xl font-bold text-green-400">
              <FaList></FaList>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/5">
          <div className="flex justify-between items-center border-2 border-gray-300 p-5 bg-white">
            <div>
              <h1 className="text-xl font-bold">{products.length}</h1>
              <p>Total Product</p>
            </div>
            <p className="text-2xl font-bold text-green-400">
              <FaList></FaList>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/5">
          <div className="flex justify-between items-center border-2 border-gray-300 p-5 bg-white">
            <div>
              <h1 className="text-xl font-bold">{items.length}</h1>
              <p>Total selling Product</p>
            </div>
            <p className="text-2xl font-bold text-green-400">
              <FaList></FaList>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/5">
          <div className="flex justify-between items-center border-2 border-gray-300 p-5 bg-white">
            <div>
              <h1 className="text-xl font-bold">
                {total} <span>taka</span>
              </h1>
              <p>Total selling price </p>
            </div>
            <p className="text-2xl font-bold text-green-400">
              <FaList></FaList>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-20">
          <SalesStatics />
          <UserMostSellingCategory items={items} />
        </div>
      </div>
      <div className="flex flex-wrap">
        <Transactions items={items} />
        <RecentOrders matchedDates={matchedDates}/>
      </div>
    </div>
  );
};

export default AdminDashboard;
