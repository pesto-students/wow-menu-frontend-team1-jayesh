import { useState } from "react";
import { useSelector } from "react-redux";
import FilterPopup from "./FilterPopup";
import Header from "./Header";
import Menu from "./Menu";

function SearchPage() {
  const products = useSelector((state) => state.product.items);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [filterOption, setFilterOption] = useState("");
  const handleInput = (searchText) => {
    setSearch(searchText.toLowerCase());
  };
  const handleFilter = (option) => {
    setFilterOption(option);
  };
  const items = products.filter((item) => {
    return (
      item.name.toLowerCase().includes(search) &&
      (filterOption === "" || item.isVeg === (filterOption === "veg"))
    );
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <Header onInput={handleInput} onFilter={() => setFilter(!filter)} />
        <Menu items={items} />
      </div>
      {filter && (
        <FilterPopup
          onClose={() => setFilter(!filter)}
          onSelect={handleFilter}
          selectedOption={filterOption}
        />
      )}
    </div>
  );
}

export default SearchPage;
