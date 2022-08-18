/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import CallWaiter from "../components/CallWaiter";
import StatusCard from "./StatusCard";
import Card from "../components/Card";
import { setOrder } from "../../../store/reducers/orderReducer";
import emptyCart from "../../../assets/images/emptyCart.svg";
import RotateScreen from "../components/RotateScreen";
import useScreenOrientation from "../../../shared/hooks/useScreenOrientation";

const socket = io.connect("https://wow-menu-staging.herokuapp.com/");
function StatusPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  const orientation = useScreenOrientation();

  useEffect(() => {
    socket.on(`${orders.id}`, (data) => {
      dispatch(setOrder(data));
    });
  }, [socket]);

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
            <PageHeader name="Order Status" />
            <div className="w-full mx-auto mt-5 md:w-4/6 lg:w-2/6">
              {orders.list.map((iteration) => {
                return (
                  <StatusCard
                    key={iteration.id}
                    className="my-3"
                    status={iteration.status}
                    items={iteration.items}
                  />
                );
              })}
              {orders.list.length === 0 && (
                <Card className="bg-light-base2 dark:bg-dark-base2">
                  <img
                    src={emptyCart}
                    alt="emptyCart"
                    className="w-3/6 mx-auto "
                  />
                  <p className="text-center text-light-text1 dark:text-dark-text1">
                    Nothing ordered yet. Add something from the menu.
                  </p>
                </Card>
              )}
            </div>
          </motion.div>
          <CallWaiter />
        </div>
      )}
    </AnimatePresence>
  );
}

export default StatusPage;
