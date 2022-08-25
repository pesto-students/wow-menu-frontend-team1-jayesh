import { useEffect } from "react";
import useAxios from "../shared/hooks/useAxios";
import { RESTAURANT } from "./endpoints";

export default function GetRestaurant(restaurantId) {
  const { response, loading, error, callApi } = useAxios();
  useEffect(() => {
    callApi({
      apiMethod: "get",
      apiUrl: `${RESTAURANT}/${restaurantId}`,
      errorToastMessage: error.message,
    });
  }, [restaurantId]);

  return { loading, error, response };
}
