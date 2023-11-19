import { useContext, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// import banner from "../../public/Home/Banner/banner.png"
import banner from "../../public/Home/Banner/banner.png";
import banner2 from "../../public/Home/Banner/slider2.webp";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { FcSmartphoneTablet } from "react-icons/fc";
import { FcSportsMode } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoMdShirt } from "react-icons/io";
import { AiTwotoneCar } from "react-icons/ai";
import { LuBaby } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { FaShoppingBasket } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import RoundCard from "../componants/RoundCard";
import RightSideBar from "../componants/RightSideBar";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-scroll";
import { Pagination } from "swiper/modules";

const categories = [
  {
    id: "02",
    name: "Health & Beauty",
    icon: <MdHealthAndSafety></MdHealthAndSafety>,
  },
  {
    id: "03",
    name: "Men's & Boy's Fashion",
    icon: <IoIosPersonAdd></IoIosPersonAdd>,
  },
  {
    id: "04",
    name: "Electronic Device",
    icon: <FcSmartphoneTablet></FcSmartphoneTablet>,
  },
  {
    id: "05",
    name: "Sports & Outdoor",
    icon: <FcSportsMode></FcSportsMode>,
  },
  {
    id: "06",
    name: "Home & Lifestyle",
    icon: <FcHome></FcHome>,
  },
  {
    id: "07",
    name: "Groceries",
    icon: <BsFillCartCheckFill></BsFillCartCheckFill>,
  },
  {
    id: "08",
    name: "Girl's Fashion ",
    icon: <IoMdShirt></IoMdShirt>,
  },
  {
    id: "09",
    name: "Vehicle & Accessories",
    icon: <AiTwotoneCar></AiTwotoneCar>,
  },
  {
    id: "10",
    name: "Kids Fashion",
    icon: <LuBaby></LuBaby>,
  },
  {
    id: "01",
    name: "All Categories",
    icon: <BiCategory></BiCategory>,
  },
  {
    id: "11",
    name: "Daily Needs",
    icon: <FaShoppingBasket></FaShoppingBasket>,
  },
];

const Banner = () => {
  const { menuValue, setMenuValue, scrollToProductSection } =
    useContext(AuthContext);
  // useEffect(() => {

  //   const allData = async () => {
  //     const res = await fetch("../../data/Categories.json");
  //     const data = await res.json();
  //     console.log("data");
  //   };
  //   return allData();
  // }, []);

  const handleMenu = (menu) => {
    setMenuValue(menu);
    scrollToProductSection(); // Invoke scrollToProductSection here
  };

  return (
    <div className="mx-auto container mt-10 ">
      <div className="md:grid  grid-cols-3 md:grid-rows-2 md:grid-cols-8 gap-5">
        <div className="row-span-0 col-span-0 order-1  md:row-span-4 md:col-span-2 md:h-[490px] overflow-hidden ">
          {/* drawer start */}
          <div className="drawer lg:drawer-open z-10 ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
            </div>
            <div className="drawer-side ">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <ul className="menu p-4 w-64 md:w-96   bg-white rounded-lg text-base-content">
                {/* Sidebar content here */}

                <div className="flex justify-between">
                  <h2 className="font-bold text-xl text-accent">
                    All Categories
                  </h2>
                  <MdKeyboardDoubleArrowRight className="text-2xl mr-5 mt-1 text-gray-500"></MdKeyboardDoubleArrowRight>
                </div>

                {categories.map((category) => {
                  return (
                    <li key={category.id}>
                      <a
                        className="font-semibold text-base"
                        onClick={() => handleMenu(category?.name)}
                      >
                        {category?.icon} {category?.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* slider start here  */}

        <div className="row-span-3  col-span-4 order-2  md:mt-0 px-5 md:px-0 rounded-2xl">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image
                className="h-[150px] md:h-[320px]  rounded-2xl object-fill"
                src={banner}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="h-[100px] md:h-[320px] rounded-2xl"
                src={banner2}
                alt=""
              />
            </SwiperSlide>
          </Swiper>

          {/* slider  */}
          <div className="bg-white rounded-xl px-5">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              
              modules={[Pagination]}
              className="mySwiper"
            >
              {categories?.map((category) => {
                return (
                  <SwiperSlide>
                    <div className="pb-12 mt-12 " key={category.id}>
                      <a
                        className="font-semibold text-base "
                        onClick={() => handleMenu(category?.name)}
                      >
                        <p className="text-xl md:text-5xl ">{category?.icon}</p> 
                        <p className="md:text-xl">{category?.name}</p>
                      </a>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* <RoundCard></RoundCard> */}
        </div>

        <div className="md:col-start-7 mt-10 md:mt-0 px-5 md:px-0 h-[500px] mb-20 shadow-2xl  md:h-[490px] md:col-span-2 md:row-start-1 md:row-span-2 bg-white order-4 rounded-lg overflow-y-auto">
          <RightSideBar></RightSideBar>
        </div>
      </div>
    </div>
  );
};

export default Banner;
