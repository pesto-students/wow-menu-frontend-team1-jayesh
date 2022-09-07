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
  const postRestaurant = (payload) => {
    callApi({
      apiMethod: "post",
      apiUrl: `${RESTAURANT}`,
      apiBody: payload,
      errorToastMessage: error.message,
    });
  };
  const updateRestaurant = (restaurantId, payload) => {
    callApi({
      apiMethod: "patch",
      apiUrl: `${RESTAURANT}/${restaurantId}`,
      apiBody: payload,
      loadingToastMessage: "Updating...",
      successToastMessage: "Updated Successfully!",
      errorToastMessage: error.message,
    });
  };

  return {
    loading,
    error,
    response,
    getRestaurant,
    postRestaurant,
    updateRestaurant,
  };
}
