/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdArrowBackIosNew } from "react-icons/md";
import useAxios from "../../../../../shared/hooks/useAxios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .typeError("You must specify a number")
    .required("Price is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().required("Image URL is required"),
  isVeg: yup
    .boolean()
    .typeError("Field is required")
    .required("Field is required"),
  spicy: yup
    .string()
    .typeError("Field is required")
    .required("Field is required"),
  isActive: yup.boolean().typeError("Field is required").required(),
  isAvailable: yup.boolean().typeError("Field is required").required(),
});

export default function AddProduct() {
  const navigate = useNavigate();
  const { response, callApi } = useAxios();
  const [categoriesData, setCategoriesData] = useState();

  useEffect(() => {
    if (!categoriesData) {
      callApi({
        apiMethod: "get",
        apiUrl: "/categories?restaurant=12345",
        params: {},
        errorToastMessage: "Failed to fetch categories data!",
      });
      setCategoriesData(response);
    }
  }, [response]);

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
      apiUrl: "/menu-items",
      params: {},
      apiBody: { ...data, restaurant: "12345" },
      successToastMessage: "Product was added successfully!",
      navigationLink: "/dashboard/settings/products-list",
    });
  };

  return (
    <div className="flex flex-col flex-1 p-4 pl-28">
      <div className="flex justify-start mb-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/settings/products-list")}
          className="px-3.5 mr-2 py-1 w-max rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59]"
        >
          <MdArrowBackIosNew />
        </button>
        <h3 className="text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
          Add Product
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
              to="/dashboard/settings/products-list"
              className="text-white hover:text-primary"
            >
              Products List
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="text-gray-500">Add Product</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex mt-5">
          <div className="w-1/2">
            <div className="relative mb-4">
              <label htmlFor="name">
                <div className="mb-2 font-semibold text-slate-300">Name</div>
                <input
                  type="text"
                  name="name"
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
            <div className="relative mb-4">
              <label htmlFor="price">
                <div className="mb-2 font-semibold text-slate-300">Price</div>
                <input
                  type="text"
                  name="price"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Price"
                />
              </label>
              <p className="text-rose-400"> {errors?.price?.message} </p>
            </div>
            <div className="relative mb-4">
              <label htmlFor="category">
                <div className="mb-2 font-semibold text-slate-300">
                  Category
                </div>
                {!categoriesData && (
                  <div className="animate-pulse">
                    <div className="h-10 rounded-md bg-slate-300 dark:bg-slate-700" />
                  </div>
                )}
                {categoriesData && (
                  <select
                    name="category"
                    {...register("category")}
                    className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary cursor-pointer"
                    placeholder="Select Category"
                  >
                    <option
                      defaultValue=""
                      className="py-2 bg-gray-700 cursor-pointer text-md"
                      disabled
                    >
                      -- Select Category --
                    </option>
                    {categoriesData?.data?.map((option) => {
                      return (
                        <option
                          key={option.id}
                          value={option.id}
                          className="py-2 bg-gray-700 cursor-pointer text-md"
                        >
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </label>
              <p className="text-rose-400">{errors?.category?.message}</p>
            </div>
            <div className="relative mb-4">
              <label htmlFor="description">
                <div className="mb-2 font-semibold text-slate-300">
                  Description
                </div>
                <textarea
                  type="text"
                  name="description"
                  {...register("description")}
                  rows="7"
                  className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Description"
                />
              </label>
              <p className="text-rose-400">{errors?.description?.message}</p>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <div className="relative mb-4">
              <label htmlFor="imageUrl">
                <div className="mb-2 font-semibold text-slate-300">
                  Image URL
                </div>
                <input
                  type="text"
                  name="imageUrl"
                  {...register("imageUrl")}
                  className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Image URL"
                />
              </label>
              <p className="text-rose-400">{errors?.imageUrl?.message}</p>
            </div>
            <div className="mt-12">
              <div className="text-slate-300">
                <input
                  type="radio"
                  name="veg"
                  value="true"
                  checked
                  {...register("isVeg")}
                />{" "}
                Veg
                <input
                  type="radio"
                  name="veg"
                  value="false"
                  {...register("isVeg")}
                  className="ml-5"
                />{" "}
                Non-Veg
              </div>
              <p className="text-rose-400">{errors?.isVeg?.message}</p>
            </div>
            <div className="mt-6 text-slate-300">
              <label htmlFor="spicy">
                <div className="font-semibold">Spicy</div>
                <input
                  type="radio"
                  name="spicy"
                  value="low"
                  checked
                  {...register("spicy")}
                />{" "}
                Low
                <input
                  type="radio"
                  name="spicy"
                  value="medium"
                  {...register("spicy")}
                  className="ml-5"
                />{" "}
                Medium
                <input
                  type="radio"
                  name="spicy"
                  value="high"
                  {...register("spicy")}
                  className="ml-5"
                />{" "}
                High
              </label>
              <p className="text-rose-400"> {errors?.spicy?.message} </p>
            </div>
            <div className="mt-6 text-slate-300">
              <label htmlFor="isActive">
                <div className="font-semibold">Active</div>
                <input
                  type="radio"
                  name="isActive"
                  value="true"
                  checked
                  {...register("isActive")}
                />{" "}
                Yes
                <input
                  type="radio"
                  name="isActive"
                  value="false"
                  {...register("isActive")}
                  className="ml-5"
                />{" "}
                No
              </label>
              <p className="text-rose-400">{errors?.isActive?.message}</p>
            </div>
            <div className="mt-6 text-slate-300">
              <label htmlFor="isAvailable">
                <div className="font-semibold">Available</div>
                <input
                  type="radio"
                  name="isAvailable"
                  value="true"
                  checked
                  {...register("isAvailable")}
                />{" "}
                Yes
                <input
                  type="radio"
                  name="isAvailable"
                  value="false"
                  {...register("isAvailable")}
                  className="ml-5"
                />{" "}
                No
              </label>
              <p className="text-rose-400">{errors?.isAvailable?.message}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mx-auto">
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
