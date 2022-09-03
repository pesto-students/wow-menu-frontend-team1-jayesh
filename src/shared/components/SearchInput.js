import { AiOutlineSearch } from "react-icons/ai";
import useDebounce from "../hooks/useDebounce";

function SearchInput({ onInput }) {
  const handleSearch = (e) => {
    onInput(e.target.value);
  };
  const search = useDebounce((e) => handleSearch(e), 500);
  return (
    <form className="flex items-center mx-2 grow">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineSearch
            size="20"
            className="text-light-text1 dark:text-dark-text1"
          />
        </div>
        <input
          type="text"
          className="w-full p-2 pl-10 border rounded focus:outline-none focus:primary focus:ring-1 bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1 "
          placeholder="Search"
          required
          onInput={(e) => search(e)}
        />
      </div>
    </form>
  );
}

export default SearchInput;
