import io from "socket.io-client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BASE_URL } from "./URL";

const socket = io.connect(BASE_URL);
export default function DashboardSocket() {
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const [newOrder, setNewOrder] = useState(null);

  useEffect(() => {
    const listener = (order) => {
      setNewOrder(order);
    };
    socket.on(`${restaurantId}`, listener);

    return () => socket.off(`${restaurantId}`, listener);
  }, [`${restaurantId}`]);

  useEffect(() => {
    const listener = (obj) => {
      toast.info(`Waiter is called at Table ${obj.tableNo}`, {
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

  return { newOrder };
}
