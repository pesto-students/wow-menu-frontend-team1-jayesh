import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import OrderCard from "./OrderCard";
import PlaceOrderCard from "./PlaceOrderCard";

function OrderPage() {
  const dishes = useSelector((state) => state.menu.dishes);
  const orders = dishes.filter((item) => item.qty > 0);
  const subtotal = parseFloat(
    orders.reduce((sum, current) => sum + current.qty * current.price, 0),
  ).toFixed(2);
  const gst = parseFloat(0.05 * subtotal).toFixed(2);
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <PageHeader name="Order Details" />
        <div className="mt-5 mb-80">
          <OrderCard className="my-3" items={orders} />
          {/* <OrderCard
            className="my-5"
            variant="status"
            status="Completed"
            items={[
              {
                name: "Spicy seasoned seafood noodles",
                isVeg: true,
                price: 269,
                qty: 2,
              },
              {
                name: "Spicy seasoned seafood noodles",
                price: 269,
                isVeg: false,
                qty: 3,
              },
            ]}
          /> */}
        </div>
      </div>
      {orders.length > 0 && (
        <PlaceOrderCard
          orders={orders}
          subtotal={subtotal}
          cgst={gst}
          sgst={gst}
        />
      )}
    </div>
  );
}

export default OrderPage;
