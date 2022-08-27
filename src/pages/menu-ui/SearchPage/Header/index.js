import BackButton from "../../../../shared/components/BackButton";
import FilterButton from "./FilterButton";
import SearchInput from "./SearchInput";

function Header({ onInput, onFilter }) {
  return (
    <div className="flex">
      <BackButton href="/home" />
      <SearchInput onInput={onInput} />
      <FilterButton onClick={onFilter} />
      {/* // filterOption={filterOption} */}
    </div>
  );
}

export default Header;
