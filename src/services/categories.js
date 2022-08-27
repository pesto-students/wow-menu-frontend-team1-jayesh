import useAxios from "../shared/hooks/useAxios";
import { CATEGORIES } from "./endpoints";

export default function CategoriesService() {
  const { response, loading, error, callApi } = useAxios();

  const getCategories = (restaurantId) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${CATEGORIES}`,
      params: { restaurant: restaurantId, isActive: true },
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, getCategories };
}
