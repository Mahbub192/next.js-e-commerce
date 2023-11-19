// index.js
import React from "react";
import Header from "./Shared/header";
import Navbar from "./Shared/navbar";
import Banner from "./Banner/banner";
import Equipment from "./Equipment/Equipment";
import Add from "./Add/add";
import Footer from "./Shared/Footer";
import Brand from "./componants/Brand";
import MostSell from "./componants/MostSell/MostSell";
import ProductSection from "./componants/ProductSection";
import DailyNeeds from "./DailyNeeds/DailyNeeds";

const index = () => {
  return (
    <div className="bg-[#EDF2FD]">
      <Header />
      <Navbar />
      <Banner />
      <DailyNeeds />
      <Equipment />
      <Add />
      <div id="product-section">
        <ProductSection /> {/* Use className here */}
      </div>

      <Brand />
      <MostSell />
      <Footer />
    </div>
  );
};

export default index;
