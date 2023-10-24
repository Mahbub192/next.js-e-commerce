import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { paginate } from "../Utilities/Pagination";
import PaginationControls from "../componants/PaginationControls";
import { AuthContext } from "../providers/AuthProvider";

const ProductPage = () => {
  const {
    filterProducts,
    state: { products, error, loading },
  } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  let paginatedPosts;
  const pageSize = 12;

  const DynamicProduct = dynamic(() => import("./Product"), {
    loading: () => <h1 className="text-center">Loading...</h1>,
    ssr: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  paginatedPosts = paginate(
    filterProducts.length > 0 ? filterProducts : products,
    currentPage,
    pageSize
  );

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>Something went wrong..!</p>;
  }
  if (!loading && !error && products.length) {
    content = paginatedPosts?.map((p) => (
      <DynamicProduct key={p._id} product={p}></DynamicProduct>
    ));
  }

  return (
    <div>
      <div>
        <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
          {content}
        </div>
      </div>

      <PaginationControls
        itemsCount={products?.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></PaginationControls>
    </div>
  );
};
export default ProductPage;
