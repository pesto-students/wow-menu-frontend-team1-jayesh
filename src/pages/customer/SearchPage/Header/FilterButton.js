import { BsFilter } from "react-icons/bs";
import IconButton from "../../../../shared/components/IconButton";

function FilterButton({ className, onClick }) {
  return (
    <div>
      <IconButton onClick={onClick} className={className}>
        <BsFilter size="26" />
      </IconButton>
    </div>
  );
}

export default FilterButton;
