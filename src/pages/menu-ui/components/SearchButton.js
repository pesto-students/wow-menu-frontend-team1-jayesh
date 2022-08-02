import { AiOutlineSearch } from "react-icons/ai";
import IconButton from "./IconButton";

function SearchButton({ theme, onClick }) {
  return (
    <IconButton theme={theme} onClick={onClick}>
      <AiOutlineSearch size="26" />
    </IconButton>
  );
}

export default SearchButton;
