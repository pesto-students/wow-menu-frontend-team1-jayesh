import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import BillCard from "./BillCard";
import PaymentCard from "./PaymentCard";
import Card from "../components/Card";

function BillPage() {
  const restaurant = useSelector((state) => state.restaurant.details);
  const billDetails = useSelector((state) => state.bill.details);
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
            {billDetails ? (
              <BillCard bill={billDetails} restaurant={restaurant} />
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
