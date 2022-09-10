/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import UploadImage from "../../../components/UploadImage";
import CategoriesService from "../../../../../services/categories";
import ProductService from "../../../../../services/products";
import FirebaseService from "../../../../../services/firebase";
import BackButton from "../../../../../shared/components/BackButton";

const schema = yup.object().shape({
  name: yup
    .string()
    .max(30, "Name must be within 30 characters")
    .required("Name is required"),
  price: yup.number().required("Price is required"),
  category: yup.string().required("Category is required"),
  description: yup.string(),
  isVeg: yup.boolean().required(),
  spicy: yup.string().required("Field is required"),
  isActive: yup.boolean().required(),
  isAvailable: yup.boolean().required(),
});

export default function EditProduct() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const { response: categoriesData, getCategories } = CategoriesService();
  const {
    loading,
    response: productData,
    getProductById,
    updateProduct,
    deleteProduct,
  } = ProductService();
  const { url, uploadFile, replaceFile } = FirebaseService();
  const restaurantId = useSelector((state) => state.restaurant.id);

  useEffect(() => {
    getProductById(id);
    getCategories({ restaurantId, active: "" });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    reset();
  }, [productData]);

  useEffect(() => {
    if (url && data) {
      data.imageUrl = url;
      updateProduct(id, data);
    }
  }, [url]);

  const submitForm = (formData) => {
    setData(formData);
    if (productData.data.imageUrl && file) {
      replaceFile(productData.data.imageUrl, file, formData.name);
    } else if (file) {
      uploadFile(file, formData.name);
    } else {
      updateProduct(id, formData);
    }
  };

  const deleteProductHandler = () => {
    deleteProduct(productData.data.imageUrl, id);
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
          <BackButton href="/dashboard/settings/products-list" />
          <h1 className="ml-2 text-2xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
            Edit Product
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
              to="/dashboard/settings/products-list"
              className="hover:text-primary"
            >
              Products List
            </Link>
          </li>
          <span className="mx-2 text-gray-500">/</span>
          <li className="text-light-text2 dark:text-dark-text2">
            Edit Product
          </li>
        </ol>
      </nav>

      <hr className="mt-3 border-gray-400 dark:border-gray-600" />
      <button
        type="button"
        onClick={deleteProductHandler}
        disabled={loading}
        className="px-3.5 py-2 w-max ml-auto mt-3 rounded border border-dashed border-rose-400 text-rose-400 bg-white dark:bg-gray-900 dark:text-rose-400 text-sm font-semibold"
      >
        <div className="flex">
          <RiDeleteBinLine size={19} className="mr-1" /> Delete Product
        </div>
      </button>
      {!productData ? (
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
        productData && (
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid mt-5 md:grid-cols-2">
              <div className="">
                <div className="relative mb-4">
                  <label htmlFor="name">
                    <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2">
                      Name
                    </p>
                    <input
                      type="text"
                      name="name"
                      defaultValue={productData.data?.name}
                      {...register("name")}
                      className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
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
                    <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2">
                      Price
                    </p>
                    <input
                      type="text"
                      name="price"
                      defaultValue={productData.data?.price}
                      {...register("price", {
                        valueAsNumber: true,
                      })}
                      className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                      placeholder="Price"
                    />
                  </label>
                  <p className="text-rose-400"> {errors?.price?.message} </p>
                </div>
                <div className="relative mb-4">
                  <label htmlFor="category">
                    <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2">
                      Category
                    </p>
                    {!categoriesData && (
                      <div className="animate-pulse">
                        <div className="h-10 rounded-md bg-slate-300 dark:bg-slate-700" />
                      </div>
                    )}
                    {categoriesData && (
                      <select
                        name="category"
                        {...register("category")}
                        defaultValue={productData.data?.category}
                        className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary cursor-pointer"
                        placeholder="Select Category"
                      >
                        <option
                          value=""
                          className="py-2 cursor-pointer bg-light-base2 dark:bg-dark-base2 text-light-text1 dark:text-dark-text1 text-md"
                          disabled
                        >
                          -- Select Category --
                        </option>
                        {categoriesData?.data?.map((option) => {
                          return (
                            <option
                              key={option.id}
                              value={option.id}
                              className="py-2 cursor-pointer bg-light-base2 dark:bg-dark-base2 text-light-text1 dark:text-dark-text1 text-md"
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
                    <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2">
                      Description
                    </p>
                    <textarea
                      type="text"
                      name="description"
                      defaultValue={productData.data?.description}
                      {...register("description")}
                      rows="8"
                      className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                      placeholder="Description"
                    />
                  </label>
                  <p className="text-rose-400">
                    {errors?.description?.message}
                  </p>
                </div>
              </div>
              <div className="md:pl-4">
                <div className="relative mb-4">
                  <UploadImage
                    storeFile={(f) => setFile(f)}
                    uploadedUrl={productData.data?.imageUrl}
                  />
                </div>
                <div className="mt-7">
                  <div className="text-light-text1 dark:text-dark-text1">
                    <input
                      type="radio"
                      name="veg"
                      value="true"
                      defaultChecked={productData.data?.isVeg}
                      {...register("isVeg")}
                    />{" "}
                    Veg
                    <input
                      type="radio"
                      name="veg"
                      value="false"
                      defaultChecked={!productData.data?.isVeg}
                      {...register("isVeg")}
                      className="ml-5"
                    />{" "}
                    Non-Veg
                  </div>
                  <p className="text-rose-400">{errors?.isVeg?.message}</p>
                </div>
                <div className="mt-6 text-light-text1 dark:text-dark-text1">
                  <label htmlFor="spicy">
                    <div className="font-semibold">Spicy</div>
                    <input
                      type="radio"
                      name="spicy"
                      value="low"
                      defaultChecked={productData.data?.spicy === "low"}
                      {...register("spicy")}
                    />{" "}
                    Low
                    <input
                      type="radio"
                      name="spicy"
                      value="medium"
                      defaultChecked={productData.data?.spicy === "medium"}
                      {...register("spicy")}
                      className="ml-5"
                    />{" "}
                    Medium
                    <input
                      type="radio"
                      name="spicy"
                      value="high"
                      defaultChecked={productData.data?.spicy === "high"}
                      {...register("spicy")}
                      className="ml-5"
                    />{" "}
                    High
                  </label>
                  <p className="text-rose-400"> {errors?.spicy?.message} </p>
                </div>
                <div className="mt-6 text-light-text1 dark:text-dark-text1">
                  <label htmlFor="isActive">
                    <div className="font-semibold">Active</div>
                    <input
                      type="radio"
                      name="isActive"
                      value="true"
                      defaultChecked={productData.data?.isActive}
                      {...register("isActive")}
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      name="isActive"
                      value="false"
                      defaultChecked={!productData.data?.isActive}
                      {...register("isActive")}
                      className="ml-5"
                    />{" "}
                    No
                  </label>
                  <p className="text-rose-400">{errors?.isActive?.message}</p>
                </div>
                <div className="mt-6 text-light-text1 dark:text-dark-text1">
                  <label htmlFor="isAvailable">
                    <div className="font-semibold">Available</div>
                    <input
                      type="radio"
                      name="isAvailable"
                      value="true"
                      defaultChecked={productData.data?.isAvailable}
                      {...register("isAvailable")}
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      name="isAvailable"
                      value="false"
                      defaultChecked={!productData.data?.isAvailable}
                      {...register("isAvailable")}
                      className="ml-5"
                    />{" "}
                    No
                  </label>
                  <p className="text-rose-400">
                    {errors?.isAvailable?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-3.5 py-3 mt-5 w-1/4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59] disabled:opacity-50"
              >
                {loading && (
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
