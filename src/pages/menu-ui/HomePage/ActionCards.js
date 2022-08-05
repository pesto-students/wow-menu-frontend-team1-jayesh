import { useSelector } from "react-redux";
import CallWaiter from "./CallWaiter";
import ViewCard from "./ViewCard";
import GenerateBillCard from "./GenerateBillCard";
import ItemInDetail from "./ItemInDetail";

function ActionCards() {
  const cart = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.order.list);
  const selectedItem = useSelector((state) => state.product.selectedItem);

  return (
    <>
      <CallWaiter />
      {orders.length > 0 && <GenerateBillCard />}
      {cart.length > 0 && <ViewCard />}
      {selectedItem.length > 0 && <ItemInDetail />}
    </>
  );
}

export default ActionCards;
