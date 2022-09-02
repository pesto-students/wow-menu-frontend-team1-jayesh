import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import CategoriesService from "../../../../../services/categories";
import CategoryFilterBar from "./CategoryFilterBar";
import BackButton from "../../../../../shared/components/BackButton";

function CategoriesList() {
  const restaurantId = useSelector((state) => state.restaurant.id);
  const { response, loading, error, getCategories } = CategoriesService();
  const [categoriesData, setCategoriesData] = useState([]);
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    if (response && response.data) {
      setCategoriesData(response);
    }
  }, [response]);

  useEffect(() => {
    if (restaurantId) {
      getCategories({ restaurantId, active: filterBy });
    }
  }, [restaurantId, filterBy]);

  const handleUpdateFilter = (status) => {
    setFilterBy(status);
  };

  return (
    <div className="flex flex-col flex-1 p-4 pl-28">
      <div className="flex items-center mb-3">
        <BackButton href="/dashboard/settings" />
        <h1 className="ml-2 text-3xl font-semibold leading-loose text-slate-800 dark:text-white">
          Categories List
        </h1>
        <button
          type="button"
          onClick={() => {
            navigate("../settings/add-category");
          }}
          className="px-3.5 py-2 w-max ml-auto my-3 rounded-lg border border-dashed border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold"
        >
          + Add new category
        </button>
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
          <li className="text-gray-500">Categories List</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />

      <div className="flex justify-end px-3.5 py-1 w-full my-3">
        <CategoryFilterBar
          filterBy={filterBy}
          updateFilter={handleUpdateFilter}
        />
      </div>
      <div className="grid gap-6 mt-2 overflow-y-auto xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-max">
        {loading ? (
          <>
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
          </>
        ) : (
          <>
            {error && <p>{error.message}</p>}
            {categoriesData &&
              categoriesData.data?.map((element) => {
                return (
                  <CategoryCard
                    key={element.id}
                    id={element.id}
                    name={element.name}
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

export default CategoriesList;
