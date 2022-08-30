import { useSelector } from "react-redux";
import useAxios from "../shared/hooks/useAxios";
import { PRODUCT } from "./endpoints";

export default function ProductService() {
  const restaurantId = useSelector((state) => state.restaurant.id);
  const { response, loading, error, callApi } = useAxios();

  const getProducts = (page, query) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${PRODUCT}`,
      params: {
        restaurant: restaurantId,
        isActive: true,
        limit: 10,
        pageNo: page,
        ...query,
      },
      errorToastMessage: error.message,
    });
  };

  return { loading, error, response, getProducts };
}
