import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import DishCardSkeleton from "./DishCardSkeleton";
import DishCard from "./DishCard";
import useAxios from "../../../../shared/hooks/useAxios";

function DishesListView() {
  const { response, loading, error } = useAxios({
    method: "get",
    url: "/menu-items?restaurant=63077d6ac31f771aaca9c858",
    headers: { accept: "*/*" },
  });
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setProductsData(response);
    }
  }, [response]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold leading-loose text-slate-800 dark:text-white">
          Choose Dishes
        </h2>
        <button
          type="button"
          className="flex gap-x-2.5 py-3 px-4 rounded-lg border border-gray-700 bg-white dark:bg-gray-900"
        >
          <FaChevronDown className="text-sm text-slate-700 dark:text-white" />
          <span className="text-sm text-slate-700 dark:text-white">
            Non Veg
          </span>
        </button>
      </div>
      <div className="grid gap-6 overflow-y-auto xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-max">
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

export default DishesListView;
