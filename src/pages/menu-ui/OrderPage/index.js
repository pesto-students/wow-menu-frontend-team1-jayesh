import PageHeader from "../components/PageHeader";
import Orders from "./Orders";
import PlaceOrderCard from "./PlaceOrderCard";

function OrderPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <PageHeader name="Order Details" />
        <Orders />
      </div>
      <PlaceOrderCard />
    </div>
  );
}

export default OrderPage;
