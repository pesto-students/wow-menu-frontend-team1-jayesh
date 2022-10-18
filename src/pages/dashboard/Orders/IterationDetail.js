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

  const changeStatus = (iterationId, status) => {
    changeIterationsStatus(orderId, iterationId, status);
  };
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true }}
      exit={{ x: 30, opacity: 0 }}
    >
      <Card className="my-3 bg-light-base1 dark:bg-dark-base3 text-light-text1 dark:text-dark-text1">
        {iteration.items.map((item) => {
          return (
            <div
              key={item.item.id}
              className="grid items-center grid-cols-4 gap-1 mb-5 md:grid-cols-6 md:gap-2"
            >
              {item.item.imageUrl ? (
                <img
                  src={item.item.imageUrl}
                  alt={item.item.name}
                  className="p-0.5 rounded-full"
                />
              ) : (
                <img
                  src={noImg}
                  alt={item.item.name}
                  className="p-0.5 rounded-full"
                />
              )}
              <p className="col-span-2 my-auto font-medium md:col-span-4">
                {item.item.name}
              </p>
              <div className="flex items-center justify-center w-10 h-10 m-auto rounded bg-light-base2 dark:bg-dark-base2">
                <p className="text-lg font-medium">{item.quantity}</p>
              </div>
            </div>
          );
        })}
        {iteration.instruction && (
          <div className="p-2 break-words rounded w-86 bg-light-base2 dark:bg-dark-base2">
            {iteration.instruction}
          </div>
        )}
        <div className="flex justify-end mt-2">
          {iteration.status === "Rejected" && (
            <p className="p-1 rounded text-accent-red">Rejected</p>
          )}
          {(iteration.status === "Preparing" ||
            iteration.status === "Completed") && (
            <p className="p-1 rounded text-accent-green">Accepted</p>
          )}
          {iteration.status === "Pending" && (
            <>
              <IconButton
                theme="outline"
                disabled={loading}
                className="mr-4 border border-1 border-accent-green disabled:opacity-50"
                onClick={() => changeStatus(iteration.id, "Preparing")}
              >
                <p className="text-base text-accent-green">Accept Order</p>
              </IconButton>
              <IconButton
                theme="outline"
                disabled={loading}
                className="border border-1 border-accent-red disabled:opacity-50"
                onClick={() => changeStatus(iteration.id, "Rejected")}
              >
                <p className="text-base text-accent-red">Reject Order</p>
              </IconButton>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export default IterationDetail;
