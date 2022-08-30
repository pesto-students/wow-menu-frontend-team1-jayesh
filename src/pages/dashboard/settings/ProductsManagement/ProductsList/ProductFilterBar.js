import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import useAxios from "../../../../../shared/hooks/useAxios";

function ProductFilterBar({ filterBy, updateFilter }) {
  const { response, callApi } = useAxios();
  const [categoriesData, setCategoriesData] = useState();
  const [filter, setFilter] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const selectFilter = (status) => {
    updateFilter(status);
  };
  const restaurantID = useSelector((state) => state.restaurant.id);

  useEffect(() => {
    if (!categoriesData) {
      callApi({
        apiMethod: "get",
        apiUrl: `/categories?restaurant=${restaurantID}`,
        params: {},
        errorToastMessage: "Failed to fetch categories data!",
      });
      setCategoriesData(response);
    }
  }, [response]);

  return (
    <motion.button
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.25 }}
      type="button"
      className="relative flex items-center justify-center p-2 px-3 border rounded shadow-sm select-none bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1"
      onClick={() => setFilter(!filter)}
    >
      <FaChevronDown className="mr-1 text-base text-light-text1 dark:text-dark-text1" />
      <span className="text-base text-light-text1 dark:text-dark-text1">
        {!categoryName ? "All Categories" : categoryName}
      </span>
      {filter && (
        <ul className="absolute right-0 z-10 flex flex-col w-48 px-8 py-2 text-base top-12 bg-light-base3 dark:bg-dark-base2 text-light-text1 dark:text-dark-text1">
          <option
            onClick={() => {
              selectFilter("");
              setCategoryName(null);
            }}
            className="my-2 "
          >
            All Categories
          </option>
          {categoriesData?.data?.map((element) => {
            return (
              <option
                key={element.id}
                onClick={() => {
                  selectFilter(element.id);
                  setCategoryName(element.name);
                }}
                selected={element.id === filterBy}
                className="my-2"
              >
                {element.name}
              </option>
            );
          })}
        </ul>
      )}
    </motion.button>
  );
}

export default ProductFilterBar;
