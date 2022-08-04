import { useSelector } from "react-redux";
import OrderButton from "./OrderButton";
import SearchButton from "./SearchButton";
import FilterButton from "./FilterButton";

function IconSet({ onSearch, onFilter }) {
  const orders = useSelector((state) => state.order.list);
  return (
    <div className="grid grid-cols-3 gap-1">
      {orders.length > 0 && <OrderButton />}
      <SearchButton className="col-start-2" onClick={onSearch} />
      <FilterButton onClick={onFilter} />
    </div>
  );
}

export default IconSet;
