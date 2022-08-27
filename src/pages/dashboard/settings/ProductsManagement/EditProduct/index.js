/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdArrowBackIosNew } from "react-icons/md";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import useAxios from "../../../../../shared/hooks/useAxios";
import UploadImage from "../../../components/UploadImage";
import storage from "../../../../../utils/firebase";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  // imageUrl: yup.string().required("Image URL is required"),
  isVeg: yup.boolean().required(),
  spicy: yup.string().required("Field is required"),
  isActive: yup.boolean().required(),
  isAvailable: yup.boolean().required(),
});

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [categoriesData, setCategoriesData] = useState();

  const { response, callApi } = useAxios();

  useEffect(() => {
    if (!loading && productData === null) {
      setLoading(true);
      callApi({
        apiMethod: "get",
        apiUrl: `/menu-items/${id}?restaurant=63077d6ac31f771aaca9c858`,
        params: {},
        errorToastMessage: "Failed to fetch product data!",
      });
    }
    if (loading && productData === null) {
      setProductData(response);
      setLoading(false);
    }
  }, [response, productData]);

  useEffect(() => {
    if (!loading && productData !== null && categoriesData === null) {
      setLoading(true);
      callApi({
        apiMethod: "get",
        apiUrl: "/categories?restaurant=63077d6ac31f771aaca9c858",
        params: {},
        errorToastMessage: "Failed to fetch categories data!",
      });
    }
    if (loading && productData !== null) {
      setCategoriesData(response);
      setLoading(false);
    }
  }, [response, productData]);

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
  }, [response]);

  useEffect(() => {
    if (percent > 0) {
      // eslint-disable-next-line
      console.log(`${percent}% Uploaded`);
    }
  }, [percent]);

  useEffect(() => {
    if (data) {
      data.imageUrl = url;
      callApi({
        apiMethod: "patch",
        apiUrl: `/menu-items/${id}`,
        params: {},
        apiBody: data,
        successToastMessage: "Product details were saved successfully!",
        navigationLink: "/dashboard/settings/products-list",
      });
    }
  }, [url]);

  const upload = (name) => {
    if (file) {
      const storageRef = ref(storage, `/files/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percentUpload = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          // update progress
          setPercent(percentUpload);
        },
        (err) => console.error(err),

        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((urlPath) => {
            setUrl(urlPath);
          });
        },
      );
    }
  };

  const submitForm = (formData) => {
    setData(formData);
    upload(formData.name);
  };

  const deleteProductHandler = () => {
    callApi({
      apiMethod: "delete",
      apiUrl: `/menu-items/${id}`,
      params: {},
      apiBody: {},
      successToastMessage: "Product was deleted successfully!",
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
          Edit Product
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
          <li className="text-gray-500">Edit Product</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />
      <button
        type="button"
        onClick={deleteProductHandler}
        className="px-3.5 py-2 w-max ml-auto mt-3 rounded-lg border border-dashed border-rose-400 text-rose-400 bg-rose-400 dark:bg-gray-900 dark:text-rose-400 text-sm font-semibold"
      >
        Delete Product
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
                      defaultValue={productData.data?.name}
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
                    <div className="mb-2 font-semibold text-slate-300">
                      Price
                    </div>
                    <input
                      type="text"
                      name="price"
                      defaultValue={productData.data?.price}
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
                        defaultValue={productData.data?.category}
                        className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary cursor-pointer"
                        placeholder="Select Category"
                      >
                        <option
                          className="py-2 bg-gray-700 cursor-pointer text-md"
                          selected
                        >
                          -- Select Category --
                        </option>
                        {categoriesData?.data?.map((option) => {
                          return (
                            <option
                              key={option.id}
                              defaultValue={option.id}
                              value={option.id}
                              className="py-2 bg-gray-700 cursor-pointer text-md"
                              selected={option.id === productData.category}
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
                      defaultValue={productData.data?.description}
                      {...register("description")}
                      rows="7"
                      className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                      placeholder="Description"
                    />
                  </label>
                  <p className="text-rose-400">
                    {errors?.description?.message}
                  </p>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <div className="relative mb-4">
                  <UploadImage
                    storeFile={(f) => setFile(f)}
                    uploadedUrl={productData.data?.imageUrl}
                  />
                  {/* <label htmlFor="imageUrl">
                    <div className="mb-2 font-semibold text-slate-300">
                      Image URL
                    </div>
                    <input
                      type="text"
                      name="imageUrl"
                      defaultValue={}
                      {...register("imageUrl")}
                      className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                      placeholder="Image URL"
                    />
                  </label>
                  <p className="text-rose-400">{errors?.imageUrl?.message}</p> */}
                </div>
                <div className="mt-12">
                  <div className="text-slate-300">
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
                <div className="mt-6 text-slate-300">
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
                <div className="mt-6 text-slate-300">
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
                <div className="mt-6 text-slate-300">
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
                className="px-3.5 py-3 mt-5 w-1/4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59]"
              >
                Save Changes
              </button>
            </div>
          </form>
        )
      )}
    </div>
  );
}
