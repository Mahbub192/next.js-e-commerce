import React from "react";
import img1 from "../../public/Home/Brand/asus.png";
import img2 from "../../public/Home/Brand/hp.png";
import img3 from "../../public/Home/Brand/Lenovo-Logo-2003.png";
import img4 from "../../public/Home/Brand/MI.png";
import img5 from "../../public/Home/Brand/samsung.png";
import img6 from "../../public/Home/Brand/walton.png";
import img7 from "../../public/Home/Brand/Sony-Logo.png";
import img8 from "../../public/Home/Brand/oneplus.png";
import Image from "next/image";

const Brand = () => {
  return (
    <div className="container mx-auto mt-20 px-5 md:px-0">
      <h1 className="text-2xl font-bold underline text-gray-600 ">Top Brands</h1>
      <div className="divider"></div>
      <div className=" py-4 ">
        <div className="grid grid-cols-2 md:grid-cols-8 gap-2 ">
          <Image className="h-20 w-24 md:h-28 md:w-36" src={img1} alt="brand" />
          <Image className="h-20 w-24 md:h-28 md:w-36" src={img2} alt="brand" />
          <Image className="h-20 w-24 md:h-28 md:w-36" src={img3} alt="brand" />
          <Image className="h-20 w-24 md:h-28 md:w-36" src={img4} alt="brand" />
          <Image className="h-20 w-24 md:h-28 md:w-36" src={img5} alt="brand" />
          <Image className="h-20 w-24 md:h-28 md:w-36" src={img6} alt="brand" />
          <Image className="h-20 w-24 md:h-28 md:w-36" src={img7} alt="brand" />
          <Image className="h-20 w-24 md:h-28 md:w-36" src={img8} alt="brand" />
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default Brand;
