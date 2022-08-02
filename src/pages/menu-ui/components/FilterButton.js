import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import IconButton from "./IconButton";
import FilterDropdown from "./FilterDropdown";

function FilterButton({ theme }) {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div>
      <IconButton theme={theme} onClick={handleClick}>
        <BsFilter size="26" />
      </IconButton>
      {show && <FilterDropdown theme={theme} />}
    </div>
  );
}

export default FilterButton;
