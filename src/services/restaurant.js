import useAxios from "../shared/hooks/useAxios";
import { RESTAURANT } from "./endpoints";

export default function RestaurantService() {
  const { response, loading, error, callApi } = useAxios();

  const getRestaurant = (restaurantId) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${RESTAURANT}/${restaurantId}`,
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, getRestaurant };
}
