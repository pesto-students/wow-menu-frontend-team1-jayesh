import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import CategoriesService from "../../../../../services/categories";

function ProductFilterBar({ filterBy, updateFilter }) {
  const { response, getCategories } = CategoriesService();
  const [categoriesData, setCategoriesData] = useState();
  const [filter, setFilter] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const [activeFilter, setActiveFilter] = useState(false);
  const [availableFilter, setAvailableFilter] = useState(null);
  const [active, setActive] = useState(null);
  const [available, setAvailable] = useState(null);
  const selectFilter = (status) => {
    updateFilter({
      ...(status.category && { category: status.category }),
      ...(status.isActive !== "" && { isActive: status.isActive }),
      ...(status.isAvailable !== "" && { isAvailable: status.isAvailable }),
    });
  };
  const restaurantId = useSelector((state) => state.restaurant.id);

  useEffect(() => {
    if (!categoriesData) {
      getCategories({ restaurantId, active: "" });
    }
  }, [response]);

  useEffect(() => {
    if (response) {
      setCategoriesData(response);
    }
  }, [response]);

  return (
    <>
      <motion.button
        type="button"
        className="relative flex items-center justify-center p-2 px-3 mx-2 my-1 border rounded shadow-sm select-none bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1"
        onClick={() => setFilter(!filter)}
      >
        <FaChevronDown className="mr-2 text-base text-light-text1 dark:text-dark-text1" />
        <span className="text-base text-light-text1 dark:text-dark-text1">
          {!categoryName ? "All Categories" : categoryName}
        </span>
        {filter && (
          <ul className="absolute right-0 z-10 flex flex-col py-2 text-base w-max top-12 bg-light-base3 dark:bg-slate-200 text-light-text1 dark:text-gray-800">
            <option
              onClick={() => {
                selectFilter({ ...filterBy, category: "" });
                setCategoryName(null);
              }}
              className="px-8 py-2 hover:dark:bg-slate-300"
            >
              All Categories
            </option>
            {categoriesData?.data?.map((element) => {
              return (
                <option
                  key={element.id}
                  onClick={() => {
                    selectFilter({ ...filterBy, category: element.id });
                    setCategoryName(element.name);
                  }}
                  className="px-8 py-2 hover:dark:bg-slate-300"
                >
                  {element.name}
                </option>
              );
            })}
          </ul>
        )}
      </motion.button>
      <motion.button
        type="button"
        className="relative flex items-center justify-center p-2 px-3 mx-2 my-1 border rounded shadow-sm select-none bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1"
        onClick={() => setActiveFilter(!activeFilter)}
      >
        <FaChevronDown className="mr-2 text-base text-light-text1 dark:text-dark-text1" />
        <span className="text-base text-light-text1 dark:text-dark-text1">
          {!active ? "Active/Inactive" : active}
        </span>
        {activeFilter && (
          <ul className="absolute right-0 z-10 flex flex-col py-2 text-base w-max top-12 bg-light-base3 dark:bg-slate-200 text-light-text1 dark:text-gray-800">
            <option
              onClick={() => {
                selectFilter({ ...filterBy, isActive: "" });
                setActive(null);
              }}
              className="px-8 py-2 hover:dark:bg-slate-300"
            >
              Active/Inactive
            </option>
            <option
              key="active"
              onClick={() => {
                selectFilter({ ...filterBy, isActive: true });
                setActive("Active");
              }}
              className="px-8 py-2 hover:dark:bg-slate-300"
            >
              Active
            </option>
            <option
              key="inactive"
              onClick={() => {
                selectFilter({ ...filterBy, isActive: false });
                setActive("Inactive");
              }}
              className="px-8 py-2 hover:dark:bg-slate-300"
            >
              Inactive
            </option>
          </ul>
        )}
      </motion.button>
      <motion.button
        type="button"
        className="relative flex items-center justify-center p-2 px-3 mx-2 my-1 border rounded shadow-sm select-none bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1"
        onClick={() => setAvailableFilter(!availableFilter)}
      >
        <FaChevronDown className="mr-2 text-base text-light-text1 dark:text-dark-text1" />
        <span className="text-base text-light-text1 dark:text-dark-text1">
          {!available ? "Available/Unavailable" : available}
        </span>
        {availableFilter && (
          <ul className="absolute right-0 z-10 flex flex-col py-2 text-base w-max top-12 bg-light-base3 dark:bg-slate-200 text-light-text1 dark:text-gray-800">
            <option
              onClick={() => {
                selectFilter({ ...filterBy, isAvailable: "" });
                setAvailable(null);
              }}
              className="px-8 py-2 hover:dark:bg-slate-300"
            >
              Available/Unavailable
            </option>
            <option
              key="available"
              onClick={() => {
                selectFilter({ ...filterBy, isAvailable: true });
                setAvailable("Available");
              }}
              className="px-8 py-2 hover:dark:bg-slate-300"
            >
              Available
            </option>
            <option
              key="unavailable"
              onClick={() => {
                selectFilter({ ...filterBy, isAvailable: false });
                setAvailable("Unavailable");
              }}
              className="px-8 py-2 hover:dark:bg-slate-300"
            >
              Unavailable
            </option>
          </ul>
        )}
      </motion.button>
    </>
  );
}

export default ProductFilterBar;
