/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import FilterPopup from "./FilterPopup";
import ItemInDetail from "../components/ItemInDetail";
import Header from "./Header";
import Menu from "./Menu";
import useProductSearch from "./useProductSearch";
import RotateScreen from "../components/RotateScreen";
import useScreenOrientation from "../../../shared/hooks/useScreenOrientation";

function SearchPage() {
  const orientation = useScreenOrientation();
  const selectedItem = useSelector((state) => state.product.selectedItem);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [filterOption, setFilterOption] = useState("");
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleInput = (searchText) => {
    setSearch(searchText);
    setPage(1);
  };
  const handleFilter = (option) => {
    setFilterOption(option);
    setPage(1);
  };
  const { products, loading, hasMore } = useProductSearch(
    search,
    page,
    filterOption,
  );
  return (
    <AnimatePresence exitBeforeEnter>
      {orientation !== 0 ? (
        <RotateScreen />
      ) : (
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
            <Menu
              items={products}
              loading={loading}
              hasMore={hasMore}
              nextPage={handleNextPage}
            />
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
      )}
    </AnimatePresence>
  );
}

export default SearchPage;
