/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdArrowBackIosNew } from "react-icons/md";
import useAxios from "../../../../../shared/hooks/useAxios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  isActive: yup.boolean().typeError("Field is required").required(),
});

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const {
    response: categoryDetailsResponse,
    loading: categoryDetailsLoading,
    error: categoryDetailsError,
    callApi,
  } = useAxios({
    url: `/categories/${id}?restaurant=12345`,
    method: "get",
    headers: { accept: "*/*" },
  });

  useEffect(() => {
    if (categoryDetailsResponse !== null) {
      setCategoryData(categoryDetailsResponse);
    }
  }, [categoryDetailsResponse]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [categoryData]);

  const submitForm = (data) => {
    callApi({
      apiMethod: "patch",
      apiUrl: `/categories/${id}`,
      params: { restaurant: 12345 },
      apiBody: data,
      successToastMessage: "Category details were saved successfully!",
      navigationLink: "/dashboard/settings/categories-list",
    });
  };

  const deleteCategoryHandler = () => {
    callApi({
      apiMethod: "delete",
      apiUrl: `/categories/${id}`,
      params: { restaurant: 12345 },
      apiBody: {},
      successToastMessage: "Category was deleted successfully!",
      navigationLink: "/dashboard/settings/categories-list",
    });
  };

  return (
    <div className="flex flex-col flex-1 p-4 pl-28">
      <div className="flex justify-start mb-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/settings/categories-list")}
          className="px-3.5 mr-2 py-1 w-max rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59]"
        >
          <MdArrowBackIosNew />
        </button>
        <h3 className="text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
          Edit Category
        </h3>
      </div>
      <nav className="w-full mb-3">
        <ol className="flex">
          <li>
            <Link
              to="/dashboard/settings"
              className="text-white hover:text-primary"
            >
              Settings
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="text-gray-500">
            <Link
              to="/dashboard/settings/categories-list"
              className="text-white hover:text-primary"
            >
              Categories List
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="text-gray-500">Edit Category</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />
      <button
        type="button"
        onClick={deleteCategoryHandler}
        className="px-3.5 py-2 w-max ml-auto mt-3 rounded-lg border border-dashed border-rose-400 text-rose-400 bg-rose-400 dark:bg-gray-900 dark:text-rose-400 text-sm font-semibold"
      >
        Delete Category
      </button>
      {categoryDetailsLoading ? (
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
        <>
          {categoryDetailsError && <p>{categoryDetailsError.message}</p>}
          {categoryData && (
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="flex mt-5">
                <div className="w-1/2">
                  <div className="relative mb-4">
                    <label htmlFor="name">
                      <div className="mb-2 font-semibold text-slate-300">
                        Name
                      </div>
                      <input
                        type="text"
                        name="name"
                        defaultValue={categoryData.data?.name}
                        {...register("name")}
                        className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                        placeholder="Name"
                      />
                    </label>
                    {errors.name && (
                      <p className="text-rose-400"> {errors.name.message} </p>
                    )}
                  </div>
                </div>
                <div className="w-1/2 pl-4">
                  <div className="mt-6 text-slate-300">
                    <label htmlFor="isActive">
                      <div className="font-semibold">Active</div>
                      <input
                        type="radio"
                        name="isActive"
                        value="true"
                        defaultChecked={categoryData.data?.isActive}
                        {...register("isActive")}
                      />{" "}
                      Yes
                      <input
                        type="radio"
                        name="isActive"
                        value="false"
                        defaultChecked={!categoryData.data?.isActive}
                        {...register("isActive")}
                        className="ml-5"
                      />{" "}
                      No
                    </label>
                    <p className="text-rose-400">{errors?.isActive?.message}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="px-3.5 py-3 mt-5 w-1/4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
