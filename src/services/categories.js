import { useEffect } from "react";
import useAxios from "../shared/hooks/useAxios";
import { CATEGORIES } from "./endpoints";

export default function GetCategories(restaurantId) {
  const { response, loading, error, callApi } = useAxios();

  useEffect(() => {
    callApi({
      apiMethod: "get",
      apiUrl: `${CATEGORIES}`,
      params: { restaurant: restaurantId, isActive: true },
      errorToastMessage: error.message,
    });
  }, [restaurantId]);

  return { loading, error, response };
}
