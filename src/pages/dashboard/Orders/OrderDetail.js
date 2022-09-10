import { useEffect } from "react";
import { motion } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import Button from "../../../shared/components/Button";
import IterationDetail from "./IterationDetail";
import OrderService from "../../../services/orders";

const statuses = ["Pending", "Preparing", "Completed", "Rejected"];

function OrderDetail({ order, onClose, updateOrder }) {
  const { loading, response, acceptAllIterations } = OrderService();

  useEffect(() => {
    if (response) {
      updateOrder(response.data);
    }
  }, [response]);

  const acceptAll = () => {
    acceptAllIterations(order.id);
  };
  const pending = order.iterations.filter(
    (iteration) => iteration.status === "Pending",
  );
  return (
    <aside className="absolute right-0 w-64 h-screen p-2 overflow-x-hidden overflow-y-auto md:p-6 md:relative md:w-96 bg-light-base2 dark:bg-dark-base2">
      <BsArrowLeft
        className="text-2xl cursor-pointer text-light-text1 dark:text-dark-text1"
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
            <Button
              disabled={loading}
              className="mt-2 mb-auto disabled:opacity-50"
              onClick={() => acceptAll()}
            >
              {loading && (
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
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
