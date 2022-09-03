import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import DishCard from "./DishCard";
import DishCardSkeleton from "./DishCardSkeleton";
import BackButton from "../../../../../shared/components/BackButton";
import useLoadProducts from "./useLoadProducts";
import ProductFilterBar from "./ProductFilterBar";

function ProductsList() {
  const navigate = useNavigate();
  const observer = useRef();
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState("");
  const { loading, products, hasMore } = useLoadProducts(page, filterBy);

  const handleUpdateFilter = (status) => {
    setFilterBy(status);
    setPage(1);
  };

  const loadMoreElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 p-4 pl-28"
    >
      <div className="flex items-center">
        <BackButton href="/dashboard/settings" />
        <h1 className="ml-2 text-3xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
          Products List
        </h1>
        <button
          type="button"
          onClick={() => {
            navigate("../settings/add-product");
          }}
          className="px-3.5 py-2 w-max ml-auto my-3 rounded border border-dashed border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold"
        >
          + Add new dish
        </button>
      </div>
      <nav className="w-full mb-3 ">
        <ol className="flex text-light-text1 dark:text-dark-text1">
          <li>
            <Link to="/dashboard/settings" className="hover:text-primary">
              Settings
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="text-gray-500">Products List</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />

      <div className="flex justify-end px-3.5 py-1 w-full my-3">
        <ProductFilterBar
          filterBy={filterBy}
          updateFilter={handleUpdateFilter}
        />
      </div>
      <div className="grid gap-6 mt-2 overflow-y-auto xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-max">
        {products &&
          products?.map((element, idx) => {
            return (
              <DishCard
                key={element.id}
                id={element.id}
                image={element.imageUrl}
                name={element.name}
                price={element.price}
                description={element.description}
                ref={products?.length === idx + 1 ? loadMoreElementRef : null}
              />
            );
          })}
        {loading && (
          <>
            <DishCardSkeleton />
            <DishCardSkeleton />
            <DishCardSkeleton />
            <DishCardSkeleton />
            <DishCardSkeleton />
          </>
        )}
      </div>
    </motion.div>
  );
}

export default ProductsList;
