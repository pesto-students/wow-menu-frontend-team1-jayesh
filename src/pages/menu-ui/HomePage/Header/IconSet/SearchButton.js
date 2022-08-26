import { AiOutlineSearch } from "react-icons/ai";
import IconButton from "../../../../../shared/components/IconButton";

function SearchButton({ className }) {
  return (
    <IconButton className={className} href="/search">
      <AiOutlineSearch size="26" />
    </IconButton>
  );
}

export default SearchButton;
