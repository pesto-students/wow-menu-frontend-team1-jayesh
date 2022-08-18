import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DishCard from "./DishCard";
import useAxios from "../../../../../shared/hooks/useAxios";
import DishCardSkeleton from "./DishCardSkeleton";

function ProductsList() {
  const { response, loading, error } = useAxios({
    url: "/menu-items?restaurant=12345",
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
      <div className="flex justify-between mb-3">
        <h3 className="text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
          Products List
        </h3>
      </div>
      <nav className="w-full mb-3">
        <ol className="flex">
          <li>
            <Link
              to="/dashboard/settings"
              className="text-white hover:text-primary"
            >
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
        className="px-3.5 py-2 w-max ml-auto my-3 rounded-lg border border-dashed border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold"
      >
        + Add new dish
      </button>
      <div className="grid grid-cols-4 gap-4 mt-2 overflow-y-auto h-max">
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
