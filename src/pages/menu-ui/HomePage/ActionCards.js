// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import CallWaiter from "../components/CallWaiter";
import ViewCard from "./ViewCard";
import GenerateBillCard from "./GenerateBillCard";
import ItemInDetail from "../components/ItemInDetail";
// import useLocalStorage from "../../../shared/hooks/useLocalStorage";
// import { setOrder } from "../../../store/reducers/orderReducer";
// import useUpdateEffect from "../../../shared/hooks/useUpdateEffect";

function ActionCards() {
  // const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.order);
  const selectedItem = useSelector((state) => state.product.selectedItem);
  // const [storedOrder, setStoredOrder] = useLocalStorage("order", orders);

  // useEffect(() => {
  //   dispatch(setOrder(storedOrder));
  // }, []);
  // useUpdateEffect(() => {
  //   setStoredOrder(orders);
  // }, [orders]);
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {orders.id && (
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
      <CallWaiter pos={!orders.id && cart.length === 0 ? "left" : "middle"} />
      <AnimatePresence exitBeforeEnter>
        {typeof selectedItem === "object" && <ItemInDetail />}
      </AnimatePresence>
    </>
  );
}

export default ActionCards;
