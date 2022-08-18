import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import CallWaiter from "../components/CallWaiter";
import StatusCard from "./StatusCard";
import Card from "../components/Card";

function StatusPage() {
  const orders = useSelector((state) => state.order.list);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5, transition: { duration: 0.1 } }}
          className="h-full p-4 overflow-x-hidden overflow-y-auto bg-lightPattern"
        >
          <PageHeader name="Order Status" />
          <div className="mt-5">
            {orders.map((iteration) => {
              return (
                <StatusCard
                  key={iteration.id}
                  className="my-3"
                  status={iteration.status}
                  items={iteration.items}
                />
              );
            })}
            {orders.length === 0 && (
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
        <CallWaiter />
      </div>
    </AnimatePresence>
  );
}

export default StatusPage;
