import { useSelector } from "react-redux";
import useAxios from "../shared/hooks/useAxios";
import { BILL } from "./endpoints";

export default function CustomerBillService() {
  const orderId = useSelector((state) => state.order.id);
  const { response, loading, error, callApi } = useAxios();

  const getBill = () => {
    callApi({
      apiMethod: "post",
      apiUrl: `${BILL}`,
      apiBody: { order: orderId },
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, getBill };
}
