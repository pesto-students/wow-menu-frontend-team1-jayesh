import { BsFilter } from "react-icons/bs";
import IconButton from "../../../../shared/components/IconButton";

// const classes = {
//   filterOption: {
//     veg: "bg-green-500",
//     nonveg: "bg-red-500",
//   },
// };

function FilterButton({ className, onClick }) {
  // , filterOption
  return (
    <div>
      <IconButton onClick={onClick} className={className}>
        <BsFilter size="26" />
        {/* {filterOption !== "" && (
          <div
            className={`absolute w-4 h-4 border-2 border-white rounded-full right-3 top-3 ${classes.filterOption[filterOption]}`}
          />
        )} */}
      </IconButton>
    </div>
  );
}

export default FilterButton;
