/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BackButton from "../../../../../shared/components/BackButton";
import CategoriesService from "../../../../../services/categories";

const schema = yup.object().shape({
  name: yup
    .string()
    .max(30, "Name must be within 30 characters")
    .required("Name is required"),
  isActive: yup.boolean().typeError("Field is required").required(),
});

export default function EditCategory() {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const {
    response: categoryDetailsResponse,
    loading: categoryDetailsLoading,
    error: categoryDetailsError,
    getCategoryById,
    updateCategory,
    deleteCategory,
  } = CategoriesService();

  useEffect(() => {
    getCategoryById(id);
  }, []);

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
    updateCategory(id, data);
  };

  const deleteCategoryHandler = () => {
    deleteCategory(id);
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
          <BackButton href="/dashboard/settings/categories-list" />
          <h1 className="ml-2 text-2xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
            Edit Category
          </h1>
        </div>
      </header>
      <nav className="w-full mb-3 text-light-text1 dark:text-dark-text1">
        <ol className="flex">
          <li>
            <Link to="/dashboard/settings" className="hover:text-primary">
              Settings
            </Link>
          </li>
          <span className="mx-2 text-gray-500">/</span>
          <li>
            <Link
              to="/dashboard/settings/categories-list"
              className="hover:text-primary"
            >
              Categories List
            </Link>
          </li>
          <span className="mx-2 text-gray-500">/</span>
          <li className="text-light-text2 dark:text-dark-text2">
            Edit Category
          </li>
        </ol>
      </nav>

      <hr className="mt-3 border-gray-400 dark:border-gray-600" />
      <button
        type="button"
        onClick={deleteCategoryHandler}
        className="px-3.5 py-2 w-max ml-auto mt-3 rounded border border-dashed border-rose-400 text-rose-400 bg-white dark:bg-gray-900 dark:text-rose-400 text-sm font-semibold"
      >
        Delete Category
      </button>
      <>
        {categoryDetailsError && <p>{categoryDetailsError.message}</p>}
        {categoryData && (
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid mt-5 md:grid-cols-2">
              <div className="">
                <div className="relative mb-4">
                  <label htmlFor="name">
                    <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2 ">
                      Name
                    </p>
                    {!categoryData.data?.name && categoryDetailsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-10 rounded-md bg-slate-300 dark:bg-slate-700" />
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="name"
                        defaultValue={categoryData.data?.name}
                        {...register("name")}
                        className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                        placeholder="Name"
                      />
                    )}
                  </label>
                  {errors.name && (
                    <p className="text-rose-400"> {errors.name.message} </p>
                  )}
                </div>
              </div>
              <div className="md:pl-4">
                <div className="text-slate-300">
                  <label htmlFor="isActive">
                    <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2">
                      Active
                    </p>
                    {!categoryData.data?.name && categoryDetailsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-10 rounded-md bg-slate-300 dark:bg-slate-700" />
                      </div>
                    ) : (
                      <div className="flex">
                        <input
                          type="radio"
                          name="isActive"
                          value="true"
                          defaultChecked={categoryData.data?.isActive}
                          {...register("isActive")}
                        />
                        <p className="ml-2 text-light-text1 dark:text-dark-text2">
                          Yes
                        </p>
                        <input
                          type="radio"
                          name="isActive"
                          value="false"
                          defaultChecked={!categoryData.data?.isActive}
                          {...register("isActive")}
                          className="ml-5"
                        />
                        <p className="ml-2 text-light-text1 dark:text-dark-text2">
                          No
                        </p>
                      </div>
                    )}
                  </label>
                  <p className="text-rose-400">{errors?.isActive?.message}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                disabled={categoryData.data?.name && categoryDetailsLoading}
                className="px-3.5 py-3 mt-5 md:w-1/4  rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59] disabled:opacity-50"
              >
                <span className="text-white ">Save Changes</span>
              </button>
            </div>
          </form>
        )}
      </>
    </motion.div>
  );
}
