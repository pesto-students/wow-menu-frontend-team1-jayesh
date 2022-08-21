import { useEffect } from "react";
import Button from "../../menu-ui/components/Button";
import IterationDetail from "./IterationDetail";
import useAxios from "../../../shared/hooks/useAxios";

function OrderDetail({ order, updateOrder }) {
  const { response, callApi } = useAxios();
  useEffect(() => {
    if (response) {
      updateOrder(response.data);
    }
  }, [response]);
  const completeAll = () => {
    callApi({
      apiUrl: `/orders/${order.id}/complete`,
      apiMethod: "patch",
      errorToastMessage: "Something went wrong, Please try again!",
    });
  };
  const isPreparing = order.iterations.filter(
    (iteration) => iteration.status === "Preparing",
  );
  return (
    <div className="flex flex-col overflow-auto grow">
      <h1 className="flex-none text-2xl font-semibold leading-loose text-light-text2 dark:text-dark-text2">
        Order #{order.id.substring(17).toUpperCase()}
      </h1>
      <div className="pb-20 overflow-y-auto grow">
        {order.iterations.map((iteration) => {
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
