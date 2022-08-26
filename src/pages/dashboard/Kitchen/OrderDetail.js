import { useEffect } from "react";
import Button from "../../../shared/components/Button";
import IterationDetail from "./IterationDetail";
import OrderService from "../../../services/orders";

const statuses = ["Pending", "Preparing", "Completed", "Rejected"];

function OrderDetail({ order, updateOrder }) {
  const { response, completeAllIterations } = OrderService();
  useEffect(() => {
    if (response) {
      updateOrder(response.data);
    }
  }, [response]);
  const completeAll = () => {
    completeAllIterations(order.id);
  };
  const isPreparing = order.iterations.filter(
    (iteration) => iteration.status === "Preparing",
  );
  return (
    <div className="flex flex-col overflow-auto grow">
      <h1 className="flex-none text-2xl font-semibold leading-loose text-light-text2 dark:text-dark-text2">
        Order #{order.id.substring(18).toUpperCase()}
      </h1>
      <div className="pb-20 overflow-x-hidden overflow-y-auto grow">
        {order.iterations
          .sort(
            (itr1, itr2) =>
              statuses.indexOf(itr1.status) - statuses.indexOf(itr2.status),
          )
          .map((iteration) => {
            return (
              <IterationDetail
                key={iteration.id}
                iteration={iteration}
                orderId={order.id}
                updateOrder={updateOrder}
              />
            );
          })}
      </div>
      <div className="my-4">
        {isPreparing.length > 0 && (
          <Button
            className="justify-center flex-none w-full text-xl"
            onClick={() => completeAll()}
          >
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );
}

export default OrderDetail;
