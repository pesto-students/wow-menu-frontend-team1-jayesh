import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Button from "../../menu-ui/components/Button";
import IterationDetail from "./IterationDetail";
import useAxios from "../../../shared/hooks/useAxios";

function OrderDetail({ order, onClose, updateOrder }) {
  const { response, callApi } = useAxios();
  useEffect(() => {
    if (response) {
      updateOrder(response.data);
    }
  }, [response]);
  const acceptAll = () => {
    callApi({
      apiUrl: `/orders/${order.id}/accept`,
      apiMethod: "patch",
      errorToastMessage: "Something went wrong, Please try again!",
    });
  };
  const pending = order.iterations.filter(
    (iteration) => iteration.status === "Pending",
  );
  return (
    <aside className="h-screen p-6 overflow-y-scroll w-96 bg-light-base2 dark:bg-dark-base2">
      <BsArrowLeft
        className="text-2xl text-light-text1 dark:text-dark-text1"
        onClick={onClose}
      />
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
            Order Details
          </h1>
          <h1 className="mb-2 text-lg text-light-text2 dark:text-dark-text2">
            Order #{order.id.substring(18).toUpperCase()}
          </h1>
        </div>
        {pending.length > 0 && (
          <Button className="mt-2 mb-auto" onClick={() => acceptAll()}>
            Accept All
          </Button>
        )}
      </div>
      <hr className="mt-3 border-gray-700 dark:border-gray-500" />
      <div>
        {order.iterations.map((iteration) => {
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
