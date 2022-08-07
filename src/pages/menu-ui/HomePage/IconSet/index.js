import { useSelector } from "react-redux";
import OrderButton from "./OrderButton";
import SearchButton from "./SearchButton";

function IconSet() {
  const orders = useSelector((state) => state.order.list);
  return (
    <div className="grid grid-cols-2 gap-1">
      {orders.length > 0 && <OrderButton />}
      <SearchButton className="col-start-2" />
    </div>
  );
}

export default IconSet;
