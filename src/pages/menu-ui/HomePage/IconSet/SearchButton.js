import { AiOutlineSearch } from "react-icons/ai";
import IconButton from "../../components/IconButton";

function SearchButton({ className, onClick }) {
  return (
    <IconButton onClick={onClick} className={className}>
      <AiOutlineSearch size="26" />
    </IconButton>
  );
}

export default SearchButton;
