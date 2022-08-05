import BackButton from "./BackButton";
import FilterButton from "./FilterButton";
import SearchInput from "./SearchInput";

function Header({ onInput, onFilter }) {
  return (
    <div className="flex">
      <BackButton />
      <SearchInput onInput={onInput} />
      <FilterButton onClick={onFilter} />
    </div>
  );
}

export default Header;
