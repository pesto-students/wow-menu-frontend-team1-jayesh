import PageHeader from "../components/PageHeader";
import OrderCard from "./OrderCard";
import PlaceOrderCard from "./PlaceOrderCard";

const index = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <PageHeader name="Order Details" />
        <div className="mt-5 mb-64">
          <OrderCard
            className="my-3"
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
          />
          <OrderCard
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
          />
        </div>
      </div>
      <PlaceOrderCard subtotal={1375} cgst={69} sgst={69} />
    </div>
  );
};

export default index;
