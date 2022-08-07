import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Orders from "./Orders";
import PlaceOrderCard from "./PlaceOrderCard";

function OrderPage() {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5, transition: { duration: 0.1 } }}
          className="h-full p-4 overflow-y-auto bg-lightPattern"
        >
          <PageHeader name="Order Details" />
          <Orders />
        </motion.div>
        <PlaceOrderCard />
      </div>
    </AnimatePresence>
  );
}

export default OrderPage;
