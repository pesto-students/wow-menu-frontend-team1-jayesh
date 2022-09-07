import useAxios from "../shared/hooks/useAxios";
import { ANALYTICS } from "./endpoints";

export default function AnalyticService() {
  const { response, loading, error, callApi } = useAxios();

  const getAnalytics = () => {
    callApi({
      apiMethod: "get",
      apiUrl: `${ANALYTICS}`,
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, getAnalytics };
}
