import useAxios from "../shared/hooks/useAxios";
import { RAZORPAY } from "./endpoints";

export default function RazorpayService() {
  const { response, loading, error, callApi } = useAxios();

  const getPaymentDetails = (billId) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${RAZORPAY}/${billId}`,
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, getPaymentDetails };
}
