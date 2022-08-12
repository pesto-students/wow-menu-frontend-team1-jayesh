import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import FilterPopup from "./FilterPopup";
import ItemInDetail from "../components/ItemInDetail";
import Header from "./Header";
import Menu from "./Menu";
import { getProducts } from "../../../redux/reducers/productReducer";

function SearchPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  const selectedItem = useSelector((state) => state.product.selectedItem);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [filterOption, setFilterOption] = useState("");
  const handleInput = (searchText) => {
    setSearch(searchText.toLowerCase());
  };
  const handleFilter = (option) => {
    setFilterOption(option);
  };
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const items = products
    .filter((item) => {
      return (
        item.name.toLowerCase().includes(search) &&
        (filterOption === "" || item.isVeg === (filterOption === "veg"))
      );
    })
    .sort(
      (firstItem, secondItem) =>
        Number(secondItem.isAvailable) - Number(firstItem.isAvailable),
    );

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5, transition: { duration: 0.1 } }}
          className="h-full p-4 overflow-x-hidden overflow-y-auto bg-lightPattern"
        >
          <Header
            onInput={handleInput}
            onFilter={() => setFilter(!filter)}
            filterOption={filterOption}
          />
          <Menu items={items} />
        </motion.div>
        <AnimatePresence exitBeforeEnter>
          {filter && (
            <FilterPopup
              onClose={() => setFilter(!filter)}
              onSelect={handleFilter}
              selectedOption={filterOption}
            />
          )}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {typeof selectedItem === "object" && <ItemInDetail />}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}

export default SearchPage;
