import { useSelector } from "react-redux";
import CallWaiter from "../components/CallWaiter";
import ViewCard from "./ViewCard";
import GenerateBillCard from "./GenerateBillCard";
import ItemInDetail from "../components/ItemInDetail";

function ActionCards() {
  const cart = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.order.list);
  const selectedItem = useSelector((state) => state.product.selectedItem);

  return (
    <>
      {orders.length > 0 && <GenerateBillCard />}
      {cart.length > 0 && <ViewCard />}
      <CallWaiter
        pos={orders.length === 0 && cart.length === 0 ? "left" : "middle"}
      />
      {typeof selectedItem === "object" && <ItemInDetail />}
    </>
  );
}

export default ActionCards;
