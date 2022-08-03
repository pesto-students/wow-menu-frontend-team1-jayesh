import BackButton from "../components/BackButton";
import OrderCard from "./OrderCard";
import PlaceOrderCard from "./PlaceOrderCard";

const index = ({ theme = "light" }) => {
  return (
    <div
      className={`relative w-screen h-screen bg-${theme}-base1 overflow-hidden`}
    >
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <BackButton />
        <div className="text-center">
          <h2 className={`text-2xl font-semibold text-${theme}-text1`}>
            Order Details
          </h2>
        </div>
        <div className="mt-5 mb-64">
          <OrderCard
            theme={theme}
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
            theme={theme}
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
            ]}
          />
          <OrderCard
            theme={theme}
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
            ]}
          />
          <OrderCard
            theme={theme}
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
            ]}
          />
          <OrderCard
            theme={theme}
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
            ]}
          />
          <OrderCard
            theme={theme}
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
            ]}
          />
          <OrderCard
            theme={theme}
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
            ]}
          />
        </div>
      </div>
      <PlaceOrderCard subtotal={1375} cgst={69} sgst={69} theme={theme} />
    </div>
  );
};

export default index;
