import OrderButton from "./OrderButton";
import SearchButton from "./SearchButton";
import FilterButton from "./FilterButton";

function orderStatus() {
  // console.log("Button Clicked to check Order Status");
}
function search() {
  // console.log("Button Clicked to search");
}

function IconSet({ theme }) {
  return (
    <div className="flex justify-between">
      <OrderButton onClick={orderStatus} />
      <SearchButton theme={theme} onClick={search} />
      <FilterButton theme={theme} />
    </div>
  );
}

export default IconSet;
