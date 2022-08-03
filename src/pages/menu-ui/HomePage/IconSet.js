import OrderButton from "../components/OrderButton";
import SearchButton from "../components/SearchButton";
import FilterButton from "../components/FilterButton";

function orderStatus() {
  // console.log("Button Clicked to check Order Status");
}
function search() {
  // console.log("Button Clicked to search");
}

function IconSet({ theme }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      <OrderButton onClick={orderStatus} />
      <SearchButton theme={theme} onClick={search} className="col-start-2" />
      <FilterButton theme={theme} />
    </div>
  );
}

export default IconSet;
