import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import PreviousOrderCard from "./PreviousOrderCard";

function Orders() {
  const cart = useSelector((state) => state.cart.items);
  const previousOrders = useSelector((state) => state.order.list);
  return (
    <div className="mt-5 mb-80">
      <OrderCard
        className="w-full mx-auto my-3 md:w-4/6 lg:w-2/6"
        items={cart}
      />
      {previousOrders.length > 0 && (
        <h3 className="mt-10 text-light-text1 dark:text-dark-text1">
          Previous Orders
        </h3>
      )}
      {previousOrders.map((iteration) => {
        return (
          <PreviousOrderCard
            key={iteration.id}
            className="my-3"
            items={iteration.items}
          />
        );
      })}
    </div>
  );
}

export default Orders;
