import BillCard from "./BillCard";
import PaymentCard from "./PaymentCard";
import BackButton from "../components/BackButton";

const index = ({ theme = "light" }) => {
  return (
    <div
      className={`relative w-screen h-screen bg-${theme}-base1 overflow-hidden`}
    >
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <BackButton />
        <div className="text-center">
          <h2 className={`text-2xl font-semibold text-${theme}-text1`}>Bill</h2>
        </div>
        <div className="mt-5 mb-64">
          <BillCard
            theme={theme}
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
      <PaymentCard theme={theme} />
    </div>
  );
};

export default index;
