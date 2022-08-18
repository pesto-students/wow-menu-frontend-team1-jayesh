import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import BillCard from "./BillCard";
import PaymentCard from "./PaymentCard";
import Card from "../components/Card";

function BillPage() {
  const restaurant = useSelector((state) => state.restaurant.details);
  const billDetails = useSelector((state) => state.bill.details);
  const billloading = useSelector((state) => state.bill.loading);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5, transition: { duration: 0.1 } }}
          className="h-full p-4 overflow-x-hidden overflow-y-auto bg-lightPattern"
        >
          <h2 className="text-2xl font-semibold text-center text-light-text1 dark:text-dark-text1">
            Bill
          </h2>
          <div className="mt-5 mb-64">
            {billloading ? (
              <div className="flex my-3 space-x-4 animate-pulse">
                <div className="flex-1 py-1 space-y-6">
                  <div className="h-2 rounded bg-slate-300 dark:bg-slate-700" />
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 col-span-2 rounded bg-slate-300 dark:bg-slate-700" />
                      <div className="h-2 col-span-1 rounded bg-slate-300 dark:bg-slate-700" />
                    </div>
                    <div className="h-2 rounded bg-slate-300 dark:bg-slate-700" />
                  </div>
                </div>
              </div>
            ) : (
              <BillCard bill={billDetails} restaurant={restaurant} />
            )}
            {!billloading && !billDetails && (
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
