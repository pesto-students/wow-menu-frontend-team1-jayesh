import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

function CategoryFilterBar({ updateFilter }) {
  const [activeFilter, setActiveFilter] = useState(false);
  const [active, setActive] = useState(null);
  const selectFilter = (status) => {
    updateFilter(status);
  };

  return (
    <motion.button
      type="button"
      className="relative flex items-center justify-center min-w-[192px] mr-0 p-2 px-3 border rounded shadow-sm select-none bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1"
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
              selectFilter("");
              setActive(null);
            }}
            className="px-8 py-2 hover:dark:bg-slate-300"
          >
            Active/Inactive
          </option>
          <option
            key="active"
            onClick={() => {
              selectFilter(true);
              setActive("Active");
            }}
            className="px-8 py-2 hover:dark:bg-slate-300"
          >
            Active
          </option>
          <option
            key="inactive"
            onClick={() => {
              selectFilter(false);
              setActive("Inactive");
            }}
            className="px-8 py-2 hover:dark:bg-slate-300"
          >
            Inactive
          </option>
        </ul>
      )}
    </motion.button>
  );
}

export default CategoryFilterBar;
