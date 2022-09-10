import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

function Filter({ filterBy, updateFilter, options }) {
  const [filter, setFilter] = useState(false);
  const selectFilter = (status) => {
    updateFilter(status);
  };
  return (
    <motion.button
      type="button"
      className="relative flex items-center justify-center p-2 px-3 border rounded shadow-sm select-none bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1"
      onClick={() => setFilter(!filter)}
    >
      <FaChevronDown className="mr-1 text-base text-light-text1 dark:text-dark-text1" />
      <span className="text-base text-light-text1 dark:text-dark-text1">
        {filterBy === "" ? "All Status" : filterBy}
      </span>
      {filter && (
        <ul className="absolute right-0 z-10 flex flex-col w-48 px-8 py-2 text-base top-12 bg-light-base3 dark:bg-dark-base2 text-light-text1 dark:text-dark-text1">
          <option onClick={() => selectFilter("")} className="my-2 ">
            All Status
          </option>
          {options.map((op) => {
            return (
              <option
                key={op}
                onClick={() => selectFilter(op)}
                className="my-2"
              >
                {op}
              </option>
            );
          })}
        </ul>
      )}
    </motion.button>
  );
}

export default Filter;
