import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import Orders from "./Orders";
import PlaceOrderCard from "./PlaceOrderCard";

function OrderPage() {
  const cart = useSelector((state) => state.cart.items);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 overflow-x-hidden overflow-y-auto bg-lightPattern customer"
      >
        <PageHeader name="Order Details" />
        <Orders />
      </motion.div>
      {cart.length > 0 && <PlaceOrderCard />}
    </>
  );
}

export default OrderPage;
