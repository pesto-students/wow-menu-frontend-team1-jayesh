import useAxios from "../shared/hooks/useAxios";
import { BILL } from "./endpoints";

export default function BillService() {
  const { response, loading, error, callApi } = useAxios();

  const getBills = () => {
    callApi({
      apiMethod: "get",
      apiUrl: `${BILL}`,
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, getBills };
}
