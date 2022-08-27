import { useSelector } from "react-redux";
import useAxios from "../shared/hooks/useAxios";
import { ORDERS } from "./endpoints";

export default function OrderService() {
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

  const getOrders = (pageNo, query) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${ORDERS}`,
      params: {
        limit: 10,
        page: pageNo,
        ...query,
      },
      errorToastMessage: error.message,
    });
  };

  const acceptAllIterations = (orderId) => {
    callApi({
      apiUrl: `${ORDERS}/${orderId}/accept`,
      apiMethod: "patch",
      errorToastMessage: error.message,
    });
  };

  const completeAllIterations = (orderId) => {
    callApi({
      apiUrl: `${ORDERS}/${orderId}/complete`,
      apiMethod: "patch",
      errorToastMessage: error.message,
    });
  };

  const changeIterationsStatus = (orderId, iterationId, status) => {
    callApi({
      apiUrl: `${ORDERS}/${orderId}/iteration/${iterationId}`,
      apiMethod: "patch",
      apiBody: { status },
      errorToastMessage: error.message,
    });
  };

  return {
    error,
    loading,
    response,
    getOrders,
    placeNewOrder,
    placeOrderAgain,
    acceptAllIterations,
    completeAllIterations,
    changeIterationsStatus,
  };
}
