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
  const getCategoryById = (id) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${CATEGORIES}/${id}`,
    });
  };
  const postCategory = (payload) => {
    callApi({
      apiMethod: "post",
      apiUrl: `${CATEGORIES}`,
      apiBody: { ...payload },
      successToastMessage: "Category was added successfully!",
      navigationLink: "/dashboard/settings/categories-list",
    });
  };
  const updateCategory = (id, payload) => {
    callApi({
      apiMethod: "patch",
      apiUrl: `${CATEGORIES}/${id}`,
      apiBody: payload,
      successToastMessage: "Category details were saved successfully!",
      navigationLink: "/dashboard/settings/categories-list",
    });
  };
  const deleteCategory = (id) => {
    callApi({
      apiMethod: "delete",
      apiUrl: `${CATEGORIES}/${id}`,
      successToastMessage: "Category was deleted successfully!",
      navigationLink: "/dashboard/settings/categories-list",
    });
  };

  return {
    loading,
    error,
    response,
    getCategories,
    getCategoryById,
    postCategory,
    updateCategory,
    deleteCategory,
  };
}
