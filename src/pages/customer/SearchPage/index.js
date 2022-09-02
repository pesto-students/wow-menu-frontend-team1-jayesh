import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import FilterPopup from "./FilterPopup";
import ItemInDetail from "../components/ItemInDetail";
import Header from "./Header";
import Menu from "./Menu";
import useProductSearch from "./useProductSearch";

function SearchPage() {
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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 overflow-x-hidden overflow-y-auto bg-lightPattern customer"
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
      {filter && (
        <FilterPopup
          onClose={() => setFilter(!filter)}
          onSelect={handleFilter}
          selectedOption={filterOption}
        />
      )}
      {typeof selectedItem === "object" && <ItemInDetail />}
    </>
  );
}

export default SearchPage;
