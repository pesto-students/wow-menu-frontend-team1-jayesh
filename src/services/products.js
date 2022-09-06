import { useSelector } from "react-redux";
import useAxios from "../shared/hooks/useAxios";
import FirebaseService from "./firebase";
import { PRODUCT } from "./endpoints";

export default function ProductService() {
  const restaurantId = useSelector((state) => state.restaurant.id);
  const { response, loading, error, callApi } = useAxios();
  const { deleteFile } = FirebaseService();

  const getProducts = (page, query) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${PRODUCT}`,
      params: {
        restaurant: restaurantId,
        limit: 10,
        pageNo: page,
        ...query,
      },
      errorToastMessage: error.message,
    });
  };

  const getProductById = (id) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${PRODUCT}/${id}`,
      errorToastMessage: error.message,
    });
  };

  const postProduct = (data) => {
    callApi({
      apiMethod: "post",
      apiUrl: "/menu-items",
      apiBody: { ...data },
      successToastMessage: "Product was added successfully!",
      errorToastMessage: error.message,
      navigationLink: "/dashboard/settings/products-list",
    });
  };

  const updateProduct = (id, data) => {
    callApi({
      apiMethod: "patch",
      apiUrl: `/menu-items/${id}`,
      apiBody: { ...data },
      successToastMessage: "Product was updated successfully!",
      errorToastMessage: error.message,
      navigationLink: "/dashboard/settings/products-list",
    });
  };

  const updateProductState = (id, data) => {
    callApi({
      apiMethod: "patch",
      apiUrl: `/menu-items/${id}`,
      apiBody: { ...data },
      loadingToastMessage: "Changing status...",
      successToastMessage: "Product was updated successfully!",
      errorToastMessage: error.message,
    });
  };

  const deleteProduct = (downloadUrl, id) => {
    if (downloadUrl) {
      deleteFile(downloadUrl);
    }
    callApi({
      apiMethod: "delete",
      apiUrl: `/menu-items/${id}`,
      successToastMessage: "Product was deleted successfully!",
      navigationLink: "/dashboard/settings/products-list",
    });
  };

  return {
    loading,
    error,
    response,
    getProducts,
    getProductById,
    postProduct,
    updateProduct,
    updateProductState,
    deleteProduct,
  };
}
