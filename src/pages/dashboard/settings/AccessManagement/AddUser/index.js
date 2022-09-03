/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdArrowBackIosNew } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import useAxios from "../../../../../shared/hooks/useAxios";

const schema = yup.object().shape({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  isAdmin: yup
    .boolean()
    .typeError("Field is required")
    .required("Choose isAdmin"),
  role: yup.string().typeError("Role is required").required("Role is required"),
});

export default function AddUser() {
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const navigate = useNavigate();
  const restaurantID = useSelector((state) => state.restaurant.id);
  const { callApi } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    callApi({
      apiMethod: "post",
      apiUrl: "/signup",
      apiBody: { ...data, restaurant: restaurantId },
      successToastMessage: "User is added successfully!",
      errorToastMessage: "Something went wrong, Please try again!",
      navigationLink: "/dashboard/settings/access-management",
    });
  };

  return (
    <div className="flex flex-col flex-1 p-4 pl-28">
      <div className="flex justify-start mb-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/settings/access-management")}
          className="px-3.5 mr-2 py-1 w-max rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59]"
        >
          <MdArrowBackIosNew />
        </button>
        <h3 className="text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
          Add User
        </h3>
      </div>
      <nav className="w-full mb-3">
        <ol className="flex">
          <li>
            <Link
              to="/dashboard/settings"
              className="dark:text-white hover:text-primary"
            >
              Settings
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="dark:text-gray-500">
            <Link
              to="/dashboard/settings/access-management"
              className="dark:text-white hover:text-primary"
            >
              Users List
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="text-gray-500">Add User</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid mt-5 md:grid-cols-2">
          <div className="">
            <div className="relative mb-4">
              <label htmlFor="firstname">
                <div className="mb-2 font-semibold text-gray-600 dark:border-gray-600 dark:text-white">
                  Firstname
                </div>
                <input
                  type="text"
                  name="firstname"
                  {...register("firstname")}
                  className="dark:bg-gray-700 placeholder-gray-500 dark:text-white text-sm rounded-md block w-full pl-3 p-2.5
                transition-colors duration-200 ease-in-out outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Firstname"
                />
              </label>
              <p className="text-rose-400"> {errors?.firstname?.message} </p>
            </div>
            <div className="relative mb-4">
              <label htmlFor="lastname">
                <div className="mb-2 font-semibold text-gray-600 dark:border-gray-600 dark:text-white">
                  Lastname
                </div>
                <input
                  type="text"
                  name="lastname"
                  {...register("lastname")}
                  className="dark:bg-gray-700 placeholder-gray-500 dark:text-white text-sm rounded-md block w-full pl-3 p-2.5
                transition-colors duration-200 ease-in-out outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Lastname"
                />
              </label>
              <p className="text-rose-400"> {errors?.lastname?.message} </p>
            </div>
            <div className="relative mb-4">
              <label htmlFor="username">
                <div className="mb-2 font-semibold text-gray-600 dark:border-gray-600 dark:text-white">
                  Username
                </div>
                <input
                  type="text"
                  name="username"
                  {...register("username")}
                  className="dark:bg-gray-700 placeholder-gray-500 dark:text-white text-sm rounded-md block w-full pl-3 p-2.5
                transition-colors duration-200 ease-in-out outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Username"
                />
              </label>
              <p className="text-rose-400"> {errors?.username?.message} </p>
            </div>
          </div>
          <div className="md:pl-4">
            <div className="relative mb-4">
              <label htmlFor="password">
                <div className="mb-2 font-semibold text-gray-600 dark:border-gray-600 dark:text-white">
                  Password
                </div>
                <input
                  type="password"
                  name="password"
                  {...register("password")}
                  className="dark:bg-gray-700 placeholder-gray-500 dark:text-white text-sm rounded-md block w-full pl-3 p-2.5
                transition-colors duration-200 ease-in-out outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Password"
                />
              </label>
              <p className="text-rose-400"> {errors?.password?.message} </p>
            </div>
            <div className="relative mb-4">
              <label htmlFor="role">
                <div className="mb-2 font-semibold text-gray-600 dark:border-gray-600 dark:text-white">
                  Role
                </div>
                <div className="dark:border-gray-600">
                  <input
                    type="radio"
                    name="role"
                    value="Chef"
                    {...register("role")}
                  />{" "}
                  <text className="dark:text-gray-400">Chef</text>
                  <input
                    type="radio"
                    name="role"
                    value="Manager"
                    checked
                    {...register("role")}
                    className="ml-5"
                  />{" "}
                  <text className="dark:text-gray-400">Manager</text>
                </div>
              </label>
              <p className="text-rose-400"> {errors?.role?.message} </p>
            </div>
            <div className="relative mb-4">
              <label htmlFor="isAdmin">
                <div className="mb-2 font-semibold text-gray-600 dark:border-gray-600 dark:text-white">
                  Admin Access
                </div>
                <div className="dark:border-gray-600">
                  <input
                    type="radio"
                    name="isAdmin"
                    value="true"
                    {...register("isAdmin")}
                  />
                  <text className="dark:text-gray-400">Yes</text>
                  <input
                    type="radio"
                    name="isAdmin"
                    value="false"
                    checked
                    {...register("isAdmin")}
                    className="ml-5"
                  />
                  <text className="dark:text-gray-400">No</text>
                </div>
              </label>
              <p className="text-rose-400"> {errors?.isAdmin?.message} </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-3.5 py-3 mt-5 w-1/4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
