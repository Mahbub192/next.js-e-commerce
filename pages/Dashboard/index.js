import React, { useContext, useState } from "react";
import { Layout, Menu } from "antd";
import { Avatar } from "antd";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaTableList, FaUserLarge } from "react-icons/fa6";
import { GiSellCard } from "react-icons/gi";
import { AuthContext } from "../providers/AuthProvider";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";
import Option1Content from "./Option1Page";
import AllUsers from "./AllUsers";
import UserProfile from "./UserDashboard/UserProfile/UserProfile";
import SellProducts from "./UserDashboard/SellProducts/SellProducts";
import AddProducts from "./AdminDashboard/AddProducts/AddProducts";
import MyOrder from "./UserDashboard/MyOrder/MyOrder";
import Link from "next/link";
import SellingProductUpdate from "./UserDashboard/SellingProductUpdate/SellingProductUpdate";
import ProductsStatusChange from "./AdminDashboard/ProductsStatusChange/ProductsStatusChange";

const { Sider, Content } = Layout;

const DashboardLayout = () => {
  // Get user data from the AuthContext
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const [content, setContent] = useState(
    isAdmin ? <AdminDashboard /> : <UserDashboard />
  );

  // Handle the admin menu item click
  const handleMenuClick = (key) => {
    if (key === "1") {
      // Display the Admin Dashboard content if isAdmin is true
      setContent(isAdmin ? <AdminDashboard /> : <UserDashboard />);
    } else if (key === "2") {
      // Display Option 1 content
      setContent(isAdmin ? <Option1Content /> : <UserProfile />);
    } else if (key === "3") {
      // Display All Users content
      setContent(isAdmin ? <AllUsers /> : <SellProducts />);
    } else if (key === "4") {
      // Display All Users content
      setContent(isAdmin ? <AddProducts /> : <MyOrder />);
    } else if (key === "5") {
      // Display All Users content
      setContent(isAdmin ? <ProductsStatusChange /> : <SellingProductUpdate />);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} theme="dark" collapsible>
        <div className="logo" />

        <div className="text-center">
          <Avatar
            className="w-12 h-12 md:w-20 md:h-20 mt-5"
            src={user?.photoURL}
          />
          <h1 className="my-2 text-lg mb-6 text-white">{user?.displayName}</h1>
        </div>

        {isAdmin ? (
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="vertical">
            <Menu.Item key="1" onClick={() => handleMenuClick("1")}>
              <p className="flex items-center">
                <span className="text-2xl">
                  <LuLayoutDashboard />
                </span>
                <span className="pl-5">Admin Dashboard</span>
              </p>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleMenuClick("2")}>
              Option 1
            </Menu.Item>
            <Menu.Item key="3" onClick={() => handleMenuClick("3")}>
              All Users
            </Menu.Item>
            <Menu.Item key="4" onClick={() => handleMenuClick("4")}>
              Add Products
            </Menu.Item>
            <Menu.Item key="5" onClick={() => handleMenuClick("5")}>
              Product Status Change
            </Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="vertical">
            <Menu.Item key="1" onClick={() => handleMenuClick("1")}>
              <p className="flex items-center">
                <span className="text-2xl">
                  <LuLayoutDashboard />
                </span>
                <span className="pl-5">User Dashboard</span>
              </p>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleMenuClick("2")}>
              <p className="flex items-center">
                <span className="text-2xl">
                  <FaUserLarge />
                </span>
                <span className="pl-5">Profile</span>
              </p>
            </Menu.Item>
            <Menu.Item key="3" onClick={() => handleMenuClick("3")}>
              <p className="flex items-center">
                <span className="text-2xl">
                  <GiSellCard />
                </span>
                <span className="pl-5">Sell Products</span>
              </p>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => handleMenuClick("4")}>
              <p className="flex items-center">
                <span className="text-2xl">
                  <FaTableList />
                </span>
                <span className="pl-5">My Orders</span>
              </p>
            </Menu.Item>
            <Menu.Item key="5" onClick={() => handleMenuClick("5")}>
              <p className="flex items-center">
                <span className="text-2xl">
                  <FaTableList />
                </span>
                <span className="pl-5">Selling Product Update</span>
              </p>
            </Menu.Item>
          </Menu>
          
        )}
        <div className="divider"></div>
        <Menu>
          <Menu.Item><Link  href={`/`}>Home</Link></Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: "40px", minHeight: "360px" }}>{content}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
