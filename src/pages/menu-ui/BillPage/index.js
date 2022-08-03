import BillCard from "./BillCard";
import PaymentCard from "./PaymentCard";
import PageHeader from "../components/PageHeader";

const index = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <PageHeader name="Bill" />
        <div className="mt-5 mb-64">
          <BillCard
            restaurant={{
              name: "Zeeshan",
              address: "5,1 Ho Chi Migh Street-700056",
            }}
            table={3}
            manager={{
              name: "Jamestax",
              id: "745sd568ds4",
            }}
            billno={301}
            items={[
              {
                name: "Spicy seasoned seafood noodles",
                price: 269,
                qty: 2,
                id: 1,
              },
              {
                name: "Spicy seasoned seafood noodles",
                price: 269,
                qty: 3,
                id: 2,
              },
              {
                name: "Spicy seasoned seafood noodles",
                price: 269,
                qty: 2,
                id: 3,
              },
            ]}
            cgst={5}
            sgst={5}
          />
        </div>
      </div>
      <PaymentCard />
    </div>
  );
};

export default index;
