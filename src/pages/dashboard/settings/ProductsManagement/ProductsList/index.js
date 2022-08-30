import { useState, useRef, useCallback } from "react";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DishCard from "./DishCard";
// import useAxios from "../../../../../shared/hooks/useAxios";
import DishCardSkeleton from "./DishCardSkeleton";
import BackButton from "../../../../../shared/components/BackButton";
import useLoadProducts from "./useLoadProducts";
import ProductFilterBar from "./ProductFilterBar";
// import Filter from "../../../components/Filter";

function ProductsList() {
  // const { response, loading, error } = useAxios({
  //   url: "/menu-items?restaurant=63077d6ac31f771aaca9c858",
  //   method: "get",
  //   headers: { accept: "*/*" },
  // });
  // const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (response !== null) {
  //     setProductsData(response);
  //   }
  // }, [response]);

  const observer = useRef();
  // const selectedCategory = useSelector(
  //   (state) => state.product.selectedCategory,
  // );
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState("");
  const { loading, products, hasMore } = useLoadProducts(page, filterBy);

  // useEffect(() => {
  //   setPage(1);
  // }, [selectedCategory]);

  const handleUpdateFilter = (status) => {
    setFilterBy(status);
    setPage(1);
    // clearSelected();
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
    <div className="flex flex-col flex-1 p-4 pl-28">
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

      <div className="flex justify-center px-3.5 py-1 w-full my-3">
        <ProductFilterBar
          filterBy={filterBy}
          updateFilter={handleUpdateFilter}
        />
        {/* <Filter
          filterBy={filterBy}
          updateFilter={handleUpdateFilter}
          options={["In progress", "Complete"]}
        /> */}
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
    </div>
  );
}

export default ProductsList;
