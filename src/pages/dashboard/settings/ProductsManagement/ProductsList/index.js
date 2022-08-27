import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DishCard from "./DishCard";
import useAxios from "../../../../../shared/hooks/useAxios";
import DishCardSkeleton from "./DishCardSkeleton";
import BackButton from "../../../../../shared/components/BackButton";

function ProductsList() {
  const { response, loading, error } = useAxios({
    url: "/menu-items?restaurant=63077d6ac31f771aaca9c858",
    method: "get",
    headers: { accept: "*/*" },
  });
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();
  const notify = () => {
    navigate("../settings/add-product");
  };

  useEffect(() => {
    if (response !== null) {
      setProductsData(response);
    }
  }, [response]);

  return (
    <div className="flex flex-col flex-1 p-4 pl-28">
      <div className="flex items-center">
        <BackButton href="/dashboard/settings" />
        <h1 className="ml-2 text-3xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
          Products List
        </h1>
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
      <button
        type="button"
        onClick={notify}
        className="px-3.5 py-2 w-max ml-auto my-3 rounded border border-dashed border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold"
      >
        + Add new dish
      </button>
      <div className="grid gap-6 mt-2 overflow-y-auto xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-max">
        {loading ? (
          <>
            <DishCardSkeleton />
            <DishCardSkeleton />
            <DishCardSkeleton />
            <DishCardSkeleton />
          </>
        ) : (
          <>
            {error && <p>{error.message}</p>}
            {productsData &&
              productsData.data?.map((element) => {
                return (
                  <DishCard
                    key={element.id}
                    id={element.id}
                    image={element.imageUrl}
                    name={element.name}
                    price={element.price}
                    description={element.description}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductsList;
