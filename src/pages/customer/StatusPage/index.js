import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import CallWaiter from "../components/CallWaiter";
import StatusCard from "./StatusCard";
import Card from "../../../shared/components/Card";
import emptyCart from "../../../assets/images/emptyCart.svg";

function StatusPage() {
  const orders = useSelector((state) => state.order);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 overflow-x-hidden overflow-y-auto bg-lightPattern"
      >
        <PageHeader name="Order Status" />
        <div className="w-full mx-auto mt-5 pb-44 md:w-4/6 lg:w-2/6">
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
              <img src={emptyCart} alt="emptyCart" className="w-3/6 mx-auto " />
              <p className="text-center text-light-text1 dark:text-dark-text1">
                Nothing ordered yet. Add something from the menu.
              </p>
            </Card>
          )}
        </div>
      </motion.div>
      <CallWaiter />
    </>
  );
}

export default StatusPage;
