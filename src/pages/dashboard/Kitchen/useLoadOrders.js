import { useState, useEffect } from "react";
import useAxios from "../../../shared/hooks/useAxios";
import useUpdateEffect from "../../../shared/hooks/useUpdateEffect";

export default function useProductSearch(page = 1) {
  // const restaurantId = useSelector((state) => state.restaurant.id);
  const restaurantId = "62f125ea334c342911733c7e";
  const { response, loading, error, callApi } = useAxios();
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    callApi({
      apiUrl: `http://localhost:5000/api/orders?restaurant=${restaurantId}&limit=10&page=${page}`,
      apiMethod: "get",
      errorToastMessage: "Something went wrong, Please try again!",
    });
  }, [page]);

  useUpdateEffect(() => {
    if (response) {
      const filteredData = response.data.filter(
        (order) => order.status !== "Pending",
      );
      setOrders((prevOrders) => {
        return [...prevOrders, ...filteredData];
      });
      setHasMore(response.data.length > 0);
    }
  }, [response]);

  return { loading, error, orders, hasMore };
}
