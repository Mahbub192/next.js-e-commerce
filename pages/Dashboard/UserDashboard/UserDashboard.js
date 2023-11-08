import React, { useContext, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import UserSalesStatics from "./UserSalesStatics/UserSalesStatics";
import UserMostSellingCategory from "./UserMostSellingCategory/UserMostSellingCategory";
import { AuthContext } from "@/pages/providers/AuthProvider";
import LoadingPage from "@/pages/LoadingPage/LoadingPage";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true)
  let email = user?.email;


  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          // Fetch products
          const productResponse = await fetch(`/api/sellProductsAPI?email=${email}`);
          if (productResponse.ok) {
            const productData = await productResponse.json();
            setProduct(productData.data);
          } else {
            console.error("Failed to fetch products");
          }

          // Fetch items
          const itemsResponse = await fetch(`/api/buyProduct?email=${email}`);
          if (itemsResponse.ok) {
            const itemsData = await itemsResponse.json();
            setItems(itemsData.data);
          } else {
            console.error("Failed to fetch items");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false)
    };

    fetchData();
  }, [email]);

  console.log("Product:", 42,product);
  console.log("Items:", 43, items);
  const statusPending = product?.filter(singleItem => singleItem.status == 'pending')
  const statusDone = product?.filter(singleItem => singleItem.status == 'Done')
  

  const price = items?.map(price => price?.price)
  const total = price?.reduce((acc, price) => acc + price, 0);
  console.log(47, total)

 
  if(loading){
    return <div className="">
      <LoadingPage ></LoadingPage>
    </div>
  }

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
              <h1 className="text-xl font-bold">{total} taka</h1>
              <p>Amount Total Buying Product</p>
            </div>
            <p className="text-2xl font-bold text-green-400">
              <FaList></FaList>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/5">
          <div className="flex justify-between items-center border-2 border-gray-300 p-5 bg-white">
            <div>
              <h1 className="text-xl font-bold">356</h1>
              <p>Amount Total Selling Product</p>
            </div>
            <p className="text-2xl font-bold text-green-400">
              <FaList></FaList>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/5">
          <div className="flex justify-between items-center border-2 border-gray-300 p-5 bg-white">
            <div>
              <h1 className="text-xl font-bold">{statusDone.length}</h1>
              <p>Number of Total Status Done  </p>
            </div>
            <p className="text-2xl font-bold text-green-400">
              <FaList></FaList>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/5">
          <div className="flex justify-between items-center border-2 border-gray-300 p-5 bg-white">
            <div>
              <h1 className="text-xl font-bold">{statusPending.length}</h1>
              <p>Number of Total Status Pending</p>
            </div>
            <p className="text-2xl font-bold text-green-400">
              <FaList></FaList>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-20">
          {/* <UserSalesStatics items={items} /> */}
          <UserMostSellingCategory items={items}/>
        </div>
      </div>
      <div className="flex flex-wrap"></div>
    </div>
  );
};

export default UserDashboard;
