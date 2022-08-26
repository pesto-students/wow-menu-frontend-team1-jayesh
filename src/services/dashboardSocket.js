import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BASE_URL } from "./URL";

const socket = io.connect(BASE_URL);
export default function DashboardSocket() {
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const [newOrder, setNewOrder] = useState(null);

  useEffect(() => {
    socket.on(`${restaurantId}`, (order) => {
      setNewOrder(order);
    });
  }, [socket]);
  return { newOrder };
}
