import { AiOutlineSearch } from "react-icons/ai";
import IconButton from "./IconButton";

function SearchButton({ theme, className, onClick }) {
  return (
    <IconButton theme={theme} onClick={onClick} className={className}>
      <AiOutlineSearch size="26" />
    </IconButton>
  );
}

export default SearchButton;
