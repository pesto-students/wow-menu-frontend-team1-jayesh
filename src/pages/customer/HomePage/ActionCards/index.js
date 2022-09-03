import { useSelector } from "react-redux";
import CallWaiter from "../../components/CallWaiter";
import ViewCard from "./ViewCard";
import GenerateBillCard from "./GenerateBillCard";
import ItemInDetail from "../../components/ItemInDetail";

function ActionCards() {
  const cart = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.order);
  const selectedItem = useSelector((state) => state.product.selectedItem);
  return (
    <>
      {typeof selectedItem !== "object" && cart.length === 0 && orders.id && (
        <GenerateBillCard />
      )}
      {typeof selectedItem !== "object" && cart.length > 0 && <ViewCard />}
      {typeof selectedItem !== "object" && (
        <CallWaiter pos={!orders.id && cart.length === 0 ? "left" : "middle"} />
      )}

      {typeof selectedItem === "object" && <ItemInDetail />}
    </>
  );
}

export default ActionCards;
