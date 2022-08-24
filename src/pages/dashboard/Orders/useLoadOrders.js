import io from "socket.io-client";
import { useState, useEffect } from "react";
import useAxios from "../../../shared/hooks/useAxios";
import useUpdateEffect from "../../../shared/hooks/useUpdateEffect";

const socket = io.connect("https://wow-menu-staging.herokuapp.com/");
export default function useProductSearch(page = 1, filterBy = "") {
  // const restaurantId = useSelector((state) => state.restaurant.id);
  const restaurantId = "62f125ea334c342911733c7e";
  const { response, loading, error, callApi } = useAxios();
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const filterByStatus = filterBy === "" ? "" : `&status=${filterBy}`;

  useEffect(() => {
    setOrders([]);
  }, [filterBy]);

  useEffect(() => {
    callApi({
      apiUrl: `https://wow-menu-staging.herokuapp.com/api/orders?restaurant=${restaurantId}&limit=10&page=${page}${filterByStatus}`,
      apiMethod: "get",
      errorToastMessage: "Something went wrong, Please try again!",
    });
  }, [page, filterBy]);

  useUpdateEffect(() => {
    if (response) {
      setOrders((prevOrders) => {
        const updatedOrder = [...prevOrders, ...response.data];
        return updatedOrder.filter(
          (o1, i, a) => a.findIndex((o2) => o2.id === o1.id) === i,
        );
      });
      setHasMore(response.data.length > 0);
    }
  }, [response]);

  useEffect(() => {
    socket.on(`${restaurantId}`, (newOrder) => {
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
    });
  }, [socket]);

  return { loading, error, orders, hasMore };
}
