import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import Button from "../../../shared/components/Button";
import IterationDetail from "./IterationDetail";
import OrderService from "../../../services/orders";

const statuses = ["Pending", "Preparing", "Completed", "Rejected"];

function OrderDetail({ order, onClose, updateOrder }) {
  const userId = useSelector((state) => state.auth.user.userDetails.id);
  const { response, acceptAllIterations } = OrderService();

  useEffect(() => {
    if (response) {
      updateOrder(response.data);
    }
  }, [response]);

  const acceptAll = () => {
    acceptAllIterations(order.id, userId);
  };
  const pending = order.iterations.filter(
    (iteration) => iteration.status === "Pending",
  );
  return (
    <aside className="absolute h-screen p-2 overflow-x-hidden overflow-y-auto md:p-6 md:relative w-50 md:w-96 bg-light-base2 dark:bg-dark-base2">
      <BsArrowLeft
        className="text-2xl text-light-text1 dark:text-dark-text1"
        onClick={onClose}
      />
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-semibold leading-loose md:text-3xl text-light-text1 dark:text-dark-text1">
            Order Details
          </h1>
          <h1 className="mb-2 text-lg text-light-text2 dark:text-dark-text2">
            Order #{order.id.substring(18).toUpperCase()}
          </h1>
        </div>
        {pending.length > 0 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Button className="mt-2 mb-auto" onClick={() => acceptAll()}>
              Accept All
            </Button>
          </motion.div>
        )}
      </div>
      <hr className="mt-3 border-gray-700 dark:border-gray-500" />
      <div>
        {order.iterations
          .sort(
            (itr1, itr2) =>
              statuses.indexOf(itr1.status) - statuses.indexOf(itr2.status),
          )
          .map((iteration) => {
            return (
              <div key={iteration.id}>
                <IterationDetail
                  iteration={iteration}
                  orderId={order.id}
                  updateOrder={updateOrder}
                />
              </div>
            );
          })}
      </div>
    </aside>
  );
}

export default OrderDetail;
