import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import CategoriesService from "../../../../../services/categories";
import CategoryFilterBar from "./CategoryFilterBar";
import BackButton from "../../../../../shared/components/BackButton";
import noCategory from "../../../../../assets/images/noOrder.svg";

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
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 p-4 pl-28"
    >
      <header className="flex items-center">
        <BackButton href="/dashboard/settings" />
        <h1 className="flex ml-2 text-2xl font-semibold leading-loose sm:text-3xl text-light-text1 dark:text-dark-text1">
          Categories <span className="hidden ml-2 sm:block">List</span>
        </h1>
        <button
          type="button"
          onClick={() => {
            navigate("../settings/add-category");
          }}
          className="flex px-3.5 py-2 w-max ml-auto my-3 rounded border border-dashed border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold"
        >
          <span className="hidden mr-2 sm:block">Add</span>
          <span className="block mr-2 sm:hidden">+</span>
          Category
        </button>
      </header>
      <nav className="w-full text-light-text1 dark:text-dark-text1">
        <ol className="flex">
          <li>
            <Link to="/dashboard/settings" className="hover:text-primary">
              Settings
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-light-text2 dark:text-dark-text2">
            Categories List
          </li>
        </ol>
      </nav>

      <hr className="mt-3 mb-0 border-gray-400 dark:border-gray-600" />

      <div className="flex justify-end px-3.5 py-1 w-full my-3">
        <CategoryFilterBar updateFilter={handleUpdateFilter} />
      </div>
      <div className="grid gap-6 p-3.5 pt-0 mt-0 overflow-y-auto xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-max">
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
      {!loading && categoriesData && categoriesData.data?.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <div>
            <img className="w-64 mx-auto" src={noCategory} alt="No Order" />
            <h3 className="mt-3 text-lg font-medium text-center text-light-text1 dark:text-dark-text2">
              No Categories present
            </h3>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CategoriesList;
