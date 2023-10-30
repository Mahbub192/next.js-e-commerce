import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { paginate } from "../Utilities/Pagination";
import PaginationControls from "../componants/PaginationControls";
import { AuthContext } from "../providers/AuthProvider";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ProductPage = () => {

  const {
    filterProducts,sub_category,setFilterSub_Category,handleAppProduct,
    state: { products, error, loading },
  } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [paginatedPosts, setPaginatedPosts] = useState([]);

  const DynamicProduct = dynamic(() => import("./Product"), {
    loading: () => <h1 className="text-center">Loading...</h1>,
    ssr: false,
  });

  console.log(23, sub_category)
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSun_Category = (category) =>{
    setFilterSub_Category(category)
  }
  const handleAppCategory = () =>{
    filterProducts
  }

  useEffect(() => {
    setPaginatedPosts(
      paginate(
        filterProducts.length > 0 ? filterProducts : products,
        1,
        pageSize
      )
    );
  }, [filterProducts, products, pageSize]);


  useEffect(() => {
    setPaginatedPosts(
      paginate(
        filterProducts.length > 0 ? filterProducts : products,
        currentPage, // Use currentPage here
        pageSize
      )
    );
  }, [filterProducts, products, currentPage, pageSize]);
  

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>Something went wrong..!</p>;
  } else if (
    !loading &&
    !error &&
    (filterProducts.length > 0 || products.length > 0)
  ) {
    content = paginatedPosts?.map((p) => (
      <DynamicProduct key={p._id} product={p}></DynamicProduct>
    ));
  } else {
    content = <p>No products available.</p>;
  }

  return (
    <div>
      <div>
        <div>
          <Tabs>
            <TabList>
              {sub_category.length>0 ? <Tab onClick={handleAppCategory}>ALl</Tab> : ""}
              {
                sub_category&& 
                sub_category.map((category,index) => <Tab key={index} onClick={()=>handleSun_Category(category)}>{category}</Tab>)
              }
            </TabList>
          </Tabs>
        </div>
        <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {content}
        </div>
      </div>

      <PaginationControls
        itemsCount={
          filterProducts.length > 0 ? filterProducts.length : products.length
        }
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></PaginationControls>
    </div>
  );
};

export default ProductPage;
