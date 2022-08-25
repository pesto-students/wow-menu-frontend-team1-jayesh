import { useSelector } from "react-redux";
import useAxios from "../shared/hooks/useAxios";
import { ORDERS } from "./endpoints";

export default function CustomerOrderService() {
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const tableNo = useSelector((state) => state.restaurant.tableNo);
  const { response, loading, error, callApi } = useAxios();

  const placeNewOrder = (payload) => {
    callApi({
      apiMethod: "post",
      apiUrl: `${ORDERS}`,
      apiBody: { ...payload, restaurant: restaurantId, tableNo },
      errorToastMessage: error.message,
    });
  };

  const placeOrderAgain = (orderId, payload) => {
    callApi({
      apiMethod: "patch",
      apiUrl: `${ORDERS}/${orderId}/add`,
      apiBody: payload,
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, placeNewOrder, placeOrderAgain };
}
