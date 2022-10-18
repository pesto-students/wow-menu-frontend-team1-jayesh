import useAxios from "../shared/hooks/useAxios";
import { LOGIN, LOGOUT, SIGNUP, USER } from "./endpoints";

export default function UserService() {
  const { response, loading, error, callApi } = useAxios();

  const userLogin = (payload) => {
    callApi({
      apiMethod: "post",
      apiUrl: `${LOGIN}`,
      apiBody: payload,
      successToastMessage: "Successfully logged in!",
    });
  };
  const userLogout = (payload) => {
    callApi({
      apiMethod: "post",
      apiUrl: `${LOGOUT}`,
      apiBody: payload,
    });
  };
  const signupOwner = (payload) => {
    callApi({
      apiMethod: "post",
      apiUrl: `${SIGNUP}`,
      apiBody: payload,
      successToastMessage:
        "Signup was successfull, Please check your email to verify your account!",
      navigationLink: "/login",
    });
  };
  const signupUser = (restaurantId, payload) => {
    callApi({
      apiMethod: "post",
      apiUrl: `${SIGNUP}`,
      apiBody: { ...payload, restaurant: restaurantId },
      successToastMessage: "User added successfully!",
      navigationLink: "/dashboard/settings/access-management",
    });
  };
  const getUsers = () => {
    callApi({
      apiMethod: "get",
      apiUrl: `${USER}s`,
      headers: { accept: "*/*" },
      errorToastMessage: "Failed to fetch user data!",
    });
  };
  const getUser = (userId) => {
    callApi({
      apiMethod: "get",
      apiUrl: `${USER}/${userId}`,
      errorToastMessage: "Failed to fetch user data!",
    });
  };
  const updateUser = (userId, payload) => {
    callApi({
      apiMethod: "patch",
      apiUrl: `${USER}/${userId}`,
      apiBody: payload,
      successToastMessage: "User details were saved successfully!",
      navigationLink: "/dashboard/settings/access-management",
    });
  };
  const removeUser = (userId) => {
    callApi({
      apiMethod: "delete",
      apiUrl: `${USER}/${userId}`,
      successToastMessage: "User was removed successfully!",
      navigationLink: "/dashboard/settings/access-management",
    });
  };

  return {
    loading,
    error,
    response,
    userLogin,
    userLogout,
    signupOwner,
    signupUser,
    getUsers,
    getUser,
    updateUser,
    removeUser,
  };
}
