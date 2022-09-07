import io from "socket.io-client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const socket = io.connect(process.env.REACT_APP_BASE_URL);
export default function DashboardNotification() {
  const restaurantId = useSelector((state) => state.restaurant.details.id);

  useEffect(() => {
    const listener = (obj) => {
      toast.info(`Waiter was called at Table ${obj.tableNo}`, {
        delay: 0,
        autoClose: false,
        theme: "colored",
      });
    };
    socket.on(`${restaurantId}WaiterCalled`, listener);

    return () => socket.off(`${restaurantId}WaiterCalled`, listener);
  }, [`${restaurantId}WaiterCalled`]);

  useEffect(() => {
    const listener = (obj) => {
      toast.info(
        `Please receive payment from Customer at Table ${obj.tableNo}`,
        {
          delay: 0,
          autoClose: false,
          theme: "colored",
        },
      );
    };
    socket.on(`${restaurantId}ReceivePayment`, listener);

    return () => socket.off(`${restaurantId}ReceivePayment`, listener);
  }, [`${restaurantId}ReceivePayment`]);
}
