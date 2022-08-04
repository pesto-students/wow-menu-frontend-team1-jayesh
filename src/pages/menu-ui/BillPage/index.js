import { useSelector } from "react-redux";
import BillCard from "./BillCard";
import PaymentCard from "./PaymentCard";
import PageHeader from "../components/PageHeader";

function BillPage() {
  const orders = useSelector((state) => state.order.list);
  const getUniqueItems = () => {
    const filteredOrders = orders.filter(
      (order) => order.status !== "Rejected",
    );
    const orderItems = filteredOrders
      .map((order) => {
        return order.items;
      })
      .flat();
    const itemMaps = new Map();
    orderItems.forEach((item) => {
      if (!itemMaps.has(item.id)) itemMaps.set(item.id, item);
      else {
        const prevItem = itemMaps.get(item.id);
        itemMaps.set(item.id, { ...item, qty: item.qty + prevItem.qty });
      }
    });
    return [...itemMaps.values()];
  };

  const items = getUniqueItems();
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
              name: "John Doe",
              id: "745sd568ds4",
            }}
            billno={301}
            items={items}
            cgst={5}
            sgst={5}
          />
        </div>
      </div>
      <PaymentCard />
    </div>
  );
}

export default BillPage;
