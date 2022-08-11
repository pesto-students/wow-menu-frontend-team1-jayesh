import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

function Orders() {
  const cart = useSelector((state) => state.cart.items);
  const previousOrders = useSelector((state) => state.order.list);

  return (
    <div className="mt-5 mb-80">
      <OrderCard className="my-3" items={cart} />
      {previousOrders.length > 0 && (
        <h3 className="mt-10 text-light-text1 dark:text-dark-text1">
          Previous Orders
        </h3>
      )}
      {previousOrders.map((order) => {
        return (
          <OrderCard
            key={order.id}
            className="my-3"
            items={order.items}
            variant="status"
            status={order.status}
          />
        );
      })}
    </div>
  );
}

export default Orders;
