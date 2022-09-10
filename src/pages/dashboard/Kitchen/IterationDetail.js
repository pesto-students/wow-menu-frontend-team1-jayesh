import { useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../../../shared/components/Card";
import IconButton from "../../../shared/components/IconButton";
import OrderService from "../../../services/orders";
import noImg from "../../../assets/images/noImg.png";

function IterationDetail({ iteration, orderId, updateOrder }) {
  const { loading, response, changeIterationsStatus } = OrderService();

  useEffect(() => {
    if (response) {
      updateOrder(response.data);
    }
  }, [response]);

  const changeStatus = (iterationId) => {
    changeIterationsStatus(orderId, iterationId, "Completed");
  };
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true }}
      exit={{ x: -30, opacity: 0 }}
    >
      <Card className="my-3 bg-light-base2 dark:bg-dark-base3 text-light-text1 dark:text-dark-text1">
        <p className="mb-3 text-xl font-medium text-end">Quantity</p>
        {iteration.items.map((item) => {
          return (
            <div key={item.item.id} className="flex justify-between mb-5">
              <div className="flex">
                {item.item.imageUrl ? (
                  <img
                    src={item.item.imageUrl}
                    alt={item.item.name}
                    className="hidden w-20 rounded-full lg:block"
                  />
                ) : (
                  <img
                    src={noImg}
                    alt={item.item.name}
                    className="hidden w-20 rounded-full lg:block"
                  />
                )}
                <p className="my-auto text-xl font-medium md:ml-5">
                  {item.item.name}
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 my-auto rounded bg-light-base2 dark:bg-dark-base2">
                <p className="text-2xl font-medium">{item.quantity}</p>
              </div>
            </div>
          );
        })}
        {iteration.instruction && (
          <div className="p-2 break-words rounded bg-light-base2 dark:bg-dark-base2">
            {iteration.instruction}
          </div>
        )}
        <div className="flex justify-end mt-2">
          {iteration.status === "Rejected" && (
            <p className="p-1 rounded text-accent-red">Rejected</p>
          )}
          {iteration.status === "Completed" && (
            <p className="p-1 rounded text-accent-green">Completed</p>
          )}
          {iteration.status === "Preparing" && (
            <IconButton
              theme="primary"
              disabled={loading}
              className="mt-2 border border-1 border-primary"
              onClick={() => changeStatus(iteration.id)}
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
              <p className="text-base">Complete</p>
            </IconButton>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export default IterationDetail;
