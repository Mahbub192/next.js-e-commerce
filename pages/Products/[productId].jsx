import React, { Fragment, useContext, useState } from "react";
import { Tab } from "@headlessui/react";
import Review from "@/pages/Products/Review";
import RootLayout from "../Layouts/RootLayout";
import Link from "next/link";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { useRouter } from "next/router";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { actionTypes } from "../states/productState/ActionTypes";
import Product from "./Product";

const ProductDetails = ({ item }) => {
  const { dispatch   } = useContext(AuthContext);

  const { user,setReviewId,  state: { products, error, loading }} = useContext(AuthContext);


  
  const [ImageChange, setImageChange] = useState(null)
  let email = user?.email;
  const [counter, setCounter] = useState(0);

  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Adding 1 because months are zero-based (0 = January)
  let year = currentDate.getFullYear();

  let formattedDate = day + "/" + month + "/" + year;

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  };

  const handelImage = (image) =>{
    setImageChange(image)
  }
  let id = item?._id;

  const handelBuyButton = async (item) => {
    const {
      _id,
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
    } = item;
    const buyItem = {
      id: _id,
      selling: item?.email,
      buying:email,
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
      quantity: counter,
    };
    const response = await fetch(`/api/buyProduct`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(buyItem),
    });
    const responseData = await response.json();
    // window.location.replace(responseData.url);
    console.log(responseData)
    if (responseData.data.acknowledged) {
      Swal.fire({
        icon: "success",
        title: "Product added successfully in database.",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.replace("/");
    }
  };

  return (
    <div className="">
      <div className="bg-[#EDF2FD]">
        <div className="container mx-auto md:flex items-center justify-around pt-10">
          <div className="md:w-1/2">
            <TransformWrapper
              initialScale={1}
              initialPositionX={200}
              initialPositionY={100}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <React.Fragment>
                  <div className="tools mb-5">
                    <button
                      className="border-2 border-blue-400 px-5 py-2 rounded-lg"
                      onClick={() => zoomIn()}
                    >
                      Zoom in+
                    </button>
                    <button
                      className="border-2 border-blue-400 px-5 py-2 rounded-lg mx-2 md:mx-5"
                      onClick={() => zoomOut()}
                    >
                      Zoom out -
                    </button>
                    <button
                      className="border-2 border-blue-400 px-5 py-2 rounded-lg"
                      onClick={() => resetTransform()}
                    >
                      Reset x
                    </button>
                  </div>
                  <TransformComponent>
                    <img className="h-[600px] w-[700px]" src={ ImageChange==null? item.images[0] : ImageChange} alt="" />
                    
                  </TransformComponent>
                </React.Fragment>
              )}
            </TransformWrapper>
            <div className="flex items-center justify-center gap-4 md:w-1/2 md:pl-10">
              <img
              onClick={()=>handelImage(item.images[1])}
                className="object-fill border-2 w-32 max-h-32 mt-4 md:ml-40"
                src={item.images[1]}
                alt=""
              />
              <img
              onClick={()=>handelImage(item.images[2])}
                className="object-fill border-2 w-32 md:max-h-32 mt-4"
                src={item.images[2]}
                alt=""
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-gray-500">Product id: {item.id}</p>
            <h2 className="text-3xl font-semibold">
              {item?.title.slice(0, 30)}
            </h2>
            <div className="flex">
              <p className="text-3xl font-semibold text-red-500 ">
                $ {item.price}{" "}
              </p>
              <p className="text-xl mt-1 px-6 line-through text-gray-600 ">
                {item.discountPercentage}
              </p>
            </div>
            <p>{item?.description.slice(0, 100)}</p>

            <div className="flex my-2 item-center">
              <svg
                className="w-7 h-7 text-orange-500 fill-current dark:text-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>

              <svg
                className="w-7 h-7 text-orange-500 fill-current dark:text-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>

              <svg
                className="w-7 h-7 text-orange-400 fill-current dark:text-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>

              <svg
                className="w-7 h-7 text-orange-300 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>

              <svg
                className="w-7 h-7 text-orange-200 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
              <p className="text-gray-500 pl-4 text-lg">({item.rating})</p>
            </div>
            <div className="text-lg text-gray-600">
              <p>
                <span className="text-gray-400">Brand :</span> {item.brand}
              </p>
              <p>
                <span className="text-gray-400">Category : </span>
                {item.category}
              </p>
            </div>

            <div className="divider"></div>
            <div className="flex">
              <div>
                <div className="btn-group pr-4">
                  <input
                    onClick={decrementCounter}
                    type="radio"
                    name="options"
                    data-title="-"
                    className="btn border border-slate-400  text-2xl"
                  />

                  <input
                    type="radio"
                    name="options"
                    data-title={counter}
                    className="btn border border-slate-400 text-xl"
                  />

                  <input
                    onClick={incrementCounter}
                    type="radio"
                    name="options"
                    data-title="+"
                    className="btn border border-slate-400 text-2xl"
                  />
                </div>
              </div>

              <Link href={`/Products/${item._id}`}>
                {user?.email && (
                  <button
                    onClick={() => handelBuyButton(item)}
                    className="btn text-white btn-accent mr-2"
                  >
                    BUY NOW
                  </button>
                )}
              </Link>
              <button onClick={() =>
              dispatch({ type: actionTypes.ADD_TO_CARD, payload: Product } )
            }
        className="btn text-white btn-secondary">ADD TO CART</button>
            </div>
          </div>
        </div>

        <div className="ml-40 py-44 overflow-y-auto mx-auto">
          <Tab.Group>
            <Tab.List>
              <div className="space-x-4 text-2xl font-semibold">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected ? "text-blue-700 underline" : "text-gray-700"
                      }
                    >
                      DESCRIPTION
                    </button>
                  )}
                </Tab>

                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected ? "text-blue-700 underline" : "text-gray-700"
                      }
                      onClick={()=>setReviewId(id)}

                    >
                      REVIEWS (1)
                    </button>
                  )}
                </Tab>
              </div>
              <div className="divider"></div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="w-3/4 text-gray-600">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Animi blanditiis, impedit doloribus, odit aut iste veniam
                    suscipit ratione maiores maxime voluptates consequuntur eius
                    perferendis in! Blanditiis, nesciunt quisquam explicabo
                    totam autem, magnam tempora nostrum ut voluptatum mollitia
                    fugit dignissimos esse nemo, odit odio! Nulla rerum ad,
                    repudiandae architecto temporibus excepturi. Vero dolore,
                    rem exercitationem laborum blanditiis sapiente ratione
                    assumenda qui! Dicta nemo architecto obcaecati ad quo ipsam
                    vel porro, error aspernatur quae, inventore ducimus id esse
                    quod beatae voluptates ab cumque omnis illum! Fugit aut
                    obcaecati ille labore culpa quod error neque sed nam, animi,
                    dolorem ullam eaque hic nemo?
                  </p>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <Review />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/server");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  const paths = data.data.map((data) => ({
    params: { productId: data._id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `http://localhost:3000/api/server?id=${params.productId}`
  );
  const data = await res.json();
  return {
    props: {
      item: data.data,
    },
  };
};

ProductDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
