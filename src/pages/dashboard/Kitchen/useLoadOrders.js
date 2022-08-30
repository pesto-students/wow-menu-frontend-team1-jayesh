import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrderService from "../../../services/orders";
import DashboardSocket from "../../../services/dashboardSocket";

export default function useLoadOrders(page = 1, filterBy = "") {
  const restaurantId = useSelector((state) => state.restaurant.id);
  const { response, loading, error, getOrders } = OrderService();
  const { newOrder } = DashboardSocket();
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setOrders([]);
  }, [filterBy]);

  useEffect(() => {
    const filterQuery = {};
    if (filterBy !== "") filterQuery.status = filterBy;
    if (restaurantId) {
      getOrders(page, filterQuery);
    }
  }, [page, filterBy]);

  useEffect(() => {
    if (response) {
      const filteredData = response.data.filter(
        (order) => order.status !== "Pending",
      );
      setOrders((prevOrders) => {
        const updatedOrder = [...prevOrders, ...filteredData];
        return updatedOrder.filter(
          (o1, i, a) => a.findIndex((o2) => o2.id === o1.id) === i,
        );
      });
      setHasMore(response.data.length > 0);
    }
  }, [response]);

  useEffect(() => {
    if (newOrder && newOrder.status !== "Pending") {
      setOrders((prevOrders) => {
        let updatedOrder;
        const id = prevOrders.findIndex((order) => order.id === newOrder.id);
        if (id >= 0)
          updatedOrder = [
            newOrder,
            ...prevOrders.filter((order) => order.id !== newOrder.id),
          ];
        else updatedOrder = [newOrder, ...prevOrders];
        return updatedOrder;
      });
    }
  }, [newOrder]);

  return { loading, error, orders, hasMore };
}
