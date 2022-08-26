import { useSelector } from "react-redux";
import useAxios from "../shared/hooks/useAxios";
import { CALL_WAITER, PAY_BY_CASH } from "./endpoints";

export default function NotificationService() {
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const tableNo = useSelector((state) => state.restaurant.tableNo);
  const { response, loading, error, callApi } = useAxios();

  const callWaiter = () => {
    callApi({
      apiMethod: "post",
      apiUrl: `${CALL_WAITER}/${restaurantId}/${tableNo}`,
      errorToastMessage: error.message,
    });
  };

  const payByCash = () => {
    callApi({
      apiMethod: "post",
      apiUrl: `${PAY_BY_CASH}/${restaurantId}/${tableNo}`,
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, callWaiter, payByCash };
}
