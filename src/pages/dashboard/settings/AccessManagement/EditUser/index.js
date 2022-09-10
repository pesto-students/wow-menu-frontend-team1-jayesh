/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineUserDelete } from "react-icons/ai";
import BackButton from "../../../../../shared/components/BackButton";
import UserService from "../../../../../services/user";

const schema = yup.object().shape({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  isAdmin: yup.boolean().typeError("Field is required"),
  role: yup.string().typeError("Role is required").required("Role is required"),
});

export default function EditUser() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const {
    loading: userLoading,
    response,
    getUser,
    updateUser,
    removeUser,
  } = UserService();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchRoleType = watch("role", "manager");

  useEffect(() => {
    if (!loading && userData === null) {
      setLoading(true);
      getUser(id);
    }
    if (loading && userData === null) {
      setUserData(response);
      setValue("role", response?.data?.role);
      setLoading(false);
    }
  }, [response, userData]);

  const submitForm = (data) => {
    const body = {
      ...data,
      isAdmin: data.role === "chef" ? false : data.isAdmin,
    };
    updateUser(id, body);
  };

  const deleteUserHandler = () => {
    removeUser(id);
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 p-4 pl-28"
    >
      <header>
        <div className="flex items-center">
          <BackButton href="/dashboard/settings/access-management" />
          <h1 className="ml-2 text-2xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
            Edit User
          </h1>
        </div>
      </header>
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
          <li className="text-gray-500">Edit User</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />
      <button
        type="button"
        onClick={deleteUserHandler}
        className="px-3.5 py-2 w-max ml-auto mt-3 rounded border border-dashed border-rose-400 text-rose-400 bg-rose-400 dark:bg-gray-900 dark:text-rose-400 text-sm font-semibold"
      >
        <div className="flex">
          <AiOutlineUserDelete size={19} className="mr-1" /> Remove User
        </div>
      </button>
      {!userData ? (
        <svg
          role="status"
          className="inline w-6 h-6 mr-3 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        userData && (
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
                      defaultValue={userData.data?.firstname}
                      {...register("firstname")}
                      className="dark:bg-gray-700 placeholder-gray-500 dark:text-white text-sm rounded-md block w-full pl-3 p-2.5
                transition-colors duration-200 ease-in-out outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Firstname"
                    />
                  </label>
                  <p className="text-rose-400">{errors?.firstname?.message}</p>
                </div>
                <div className="relative mb-4">
                  <label htmlFor="username">
                    <div className="mb-2 font-semibold text-gray-600 dark:border-gray-600 dark:text-white">
                      Username
                    </div>
                    <input
                      type="text"
                      name="username"
                      defaultValue={userData.data?.username}
                      disabled
                      {...register("username")}
                      className="dark:bg-gray-700 placeholder-gray-500 dark:text-white text-sm rounded-md block w-full pl-3 p-2.5
                transition-colors duration-200 ease-in-out outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                      placeholder="Username"
                    />
                  </label>
                  <p className="text-rose-400">{errors?.username?.message}</p>
                </div>
                {watchRoleType === "manager" && (
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
                          defaultChecked={userData.data?.isAdmin}
                          {...register("isAdmin")}
                        />
                        <span className="dark:text-gray-400">Yes</span>
                        <input
                          type="radio"
                          name="isAdmin"
                          value="false"
                          defaultChecked={!userData.data?.isAdmin}
                          {...register("isAdmin")}
                          className="ml-5"
                        />
                        <span className="dark:text-gray-400">No</span>
                      </div>
                    </label>
                    <p className="text-rose-400">{errors?.isAdmin?.message}</p>
                  </div>
                )}
              </div>
              <div className="md:pl-4">
                <div className="relative mb-4">
                  <label htmlFor="lastname">
                    <div className="mb-2 font-semibold text-gray-600 dark:border-gray-600 dark:text-white">
                      Lastname
                    </div>
                    <input
                      type="text"
                      name="lastname"
                      defaultValue={userData.data?.lastname}
                      {...register("lastname")}
                      className="dark:bg-gray-700 placeholder-gray-500 dark:text-white text-sm rounded-md block w-full pl-3 p-2.5
                transition-colors duration-200 ease-in-out outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Lastname"
                    />
                  </label>
                  <p className="text-rose-400">{errors?.lastname?.message}</p>
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
                        value="chef"
                        defaultChecked={userData.data?.role === "chef"}
                        {...register("role")}
                      />
                      <span className="dark:text-gray-400">Chef</span>
                      <input
                        type="radio"
                        name="role"
                        value="manager"
                        defaultChecked={userData.data?.role === "manager"}
                        {...register("role")}
                        className="ml-5"
                      />
                      <span className="dark:text-gray-400">Manager</span>
                    </div>
                  </label>
                  <p className="text-rose-400"> {errors?.role?.message} </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                disabled={userLoading}
                type="submit"
                className="px-3.5 py-3 mt-5 w-1/4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59] disabled:opacity-50"
              >
                {userLoading && (
                  <svg
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Save Changes
              </button>
            </div>
          </form>
        )
      )}
    </motion.div>
  );
}
