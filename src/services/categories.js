import useAxios from "../shared/hooks/useAxios";
import { CATEGORIES } from "./endpoints";

export default function CategoriesService() {
  const { response, loading, error, callApi } = useAxios();

  const getCategories = ({ restaurantId, active = true }) => {
    const query = active !== "" ? { isActive: active } : "";
    callApi({
      apiMethod: "get",
      apiUrl: `${CATEGORIES}`,
      params: { restaurant: restaurantId, ...query },
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, getCategories };
}
