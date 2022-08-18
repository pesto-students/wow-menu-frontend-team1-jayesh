import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import Orders from "./Orders";
import PlaceOrderCard from "./PlaceOrderCard";
import RotateScreen from "../components/RotateScreen";
import useScreenOrientation from "../../../shared/hooks/useScreenOrientation";

function OrderPage() {
  const cart = useSelector((state) => state.cart.items);
  const orientation = useScreenOrientation();

  return (
    <AnimatePresence exitBeforeEnter>
      {orientation !== 0 ? (
        <RotateScreen />
      ) : (
        <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5, transition: { duration: 0.1 } }}
            className="h-full p-4 overflow-x-hidden overflow-y-auto bg-lightPattern"
          >
            <PageHeader name="Order Details" />
            <Orders />
          </motion.div>
          <AnimatePresence exitBeforeEnter>
            {cart.length > 0 && (
              <motion.div
                initial={{ y: 150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 150, opacity: 0 }}
              >
                <PlaceOrderCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}

export default OrderPage;
