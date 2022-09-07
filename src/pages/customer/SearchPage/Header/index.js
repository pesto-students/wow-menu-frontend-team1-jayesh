import BackButton from "../../../../shared/components/BackButton";
import FilterButton from "./FilterButton";
import SearchInput from "../../../../shared/components/SearchInput";

function Header({ onInput, onFilter }) {
  return (
    <div className="flex">
      <BackButton href="/home" />
      <SearchInput onInput={onInput} />
      <FilterButton onClick={onFilter} />
    </div>
  );
}

export default Header;
