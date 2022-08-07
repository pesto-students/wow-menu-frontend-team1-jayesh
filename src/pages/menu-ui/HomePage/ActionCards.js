import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import CallWaiter from "../components/CallWaiter";
import ViewCard from "./ViewCard";
import GenerateBillCard from "./GenerateBillCard";
import ItemInDetail from "../components/ItemInDetail";

function ActionCards() {
  const cart = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.order.list);
  const selectedItem = useSelector((state) => state.product.selectedItem);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {orders.length > 0 && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
          >
            <GenerateBillCard />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
          >
            <ViewCard />
          </motion.div>
        )}
      </AnimatePresence>
      <CallWaiter
        pos={orders.length === 0 && cart.length === 0 ? "left" : "middle"}
      />
      <AnimatePresence exitBeforeEnter>
        {typeof selectedItem === "object" && <ItemInDetail />}
      </AnimatePresence>
    </>
  );
}

export default ActionCards;
