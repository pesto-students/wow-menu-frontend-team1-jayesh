import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import BillCard from "./BillCard";
import PaymentCard from "./PaymentCard";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

function BillPage() {
  const orders = useSelector((state) => state.order.list);
  const manager = useSelector((state) => state.order.manager);
  const restaurant = useSelector((state) => state.restaurant.details);
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
    <AnimatePresence exitBeforeEnter>
      <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5, transition: { duration: 0.1 } }}
          className="h-full p-4 overflow-y-auto bg-lightPattern"
        >
          <PageHeader name="Bill" />
          <div className="mt-5 mb-64">
            {items.length > 0 ? (
              <BillCard
                restaurant={restaurant}
                manager={manager}
                billno={301}
                items={items}
                table={7}
              />
            ) : (
              <Card className="bg-light-base2 dark:bg-dark-base2">
                <h2 className="mb-3 font-medium text-center text-light-text1 dark:text-dark-text1">
                  Nothing ordered yet.
                </h2>
                <h2 className="font-medium text-center text-light-text1 dark:text-dark-text1">
                  Please order something!!!
                </h2>
              </Card>
            )}
          </div>
        </motion.div>
        <PaymentCard />
      </div>
    </AnimatePresence>
  );
}

export default BillPage;
