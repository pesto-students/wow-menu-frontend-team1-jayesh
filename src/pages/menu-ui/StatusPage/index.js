import PageHeader from "../components/PageHeader";
import StatusCard from "./StatusCard";

const index = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <PageHeader name="Order Status" />
        <div className="mt-5 mb-64">
          <StatusCard
            className="my-3"
            status="Preparing"
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
          <StatusCard
            className="my-5"
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
                isVeg: true,
                price: 269,
                qty: 2,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
