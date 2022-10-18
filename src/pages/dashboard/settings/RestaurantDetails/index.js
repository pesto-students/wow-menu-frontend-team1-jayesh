/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BackButton from "../../../../shared/components/BackButton";
import RestaurantService from "../../../../services/restaurant";
import { setRestaurant } from "../../../../store/reducers/restaurantReducer";
import states from "./States";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  gstPercentage: yup
    .number()
    .typeError("You must specify a number")
    .max(99, "Must be valid percentage")
    .required("GST Percentage is required"),
  gstNumber: yup
    .string()
    .matches(
      /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/,
      "Please eneter a valid GST Number",
    )
    .required("GST Number is required"),
  address: yup.object().shape({
    street: yup.string().required("Street Address is required"),
    state: yup.string().required("State is required"),
    pincode: yup
      .number()
      .typeError("Invalid Pincode")
      .min(100000, "Invalid Pincode")
      .max(999999, "Invalid Pincode")
      .required("Pincode is required"),
  }),
});

export default function RestaurantDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurantId = useSelector((state) => state.restaurant.id);
  const userId = useSelector((state) => state.auth.user.userDetails.id);
  const { loading, response, getRestaurant, postRestaurant, updateRestaurant } =
    RestaurantService();

  const [restaurantData, setRestaurantData] = useState({ data: null });
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (restaurantId) {
      getRestaurant(restaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (response && response.data) {
      setRestaurantData(response);
      reset();
    }
  }, [response]);

  useEffect(() => {
    if (response && response.data && modifiedFlag) {
      dispatch(setRestaurant(response.data));
      navigate("/dashboard/settings");
    }
  }, [response]);

  const submitForm = (data) => {
    if (restaurantId) {
      updateRestaurant(restaurantId, { ...data });
    } else {
      postRestaurant({ ...data, createdBy: userId });
    }
    setModifiedFlag(true);
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-screen p-4 pl-28"
    >
      <header>
        <div className="flex items-center">
          <BackButton href="/dashboard/settings" />
          <h1 className="flex ml-2 text-3xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
            Restaurant <span className="hidden ml-2 sm:block">Details</span>
          </h1>
        </div>
      </header>
      <nav className="w-full text-light-text1 dark:text-dark-text1">
        <ol className="flex">
          <li>
            <Link to="/dashboard/settings" className="hover:text-primary">
              Settings
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-light-text2 dark:text-dark-text2">
            Restaurant Details
          </li>
        </ol>
      </nav>
      <hr className="mt-3 mb-8 border-gray-400 dark:border-gray-600" />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="gap-4 mt-5 md:grid">
          <div>
            <label htmlFor="name">
              <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2 ">
                Name
              </p>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-10 rounded-md bg-slate-300 dark:bg-slate-700" />
                </div>
              ) : (
                <input
                  type="text"
                  name="name"
                  defaultValue={restaurantData.data?.name}
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
          <div>
            <label htmlFor="phoneNumber">
              <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2 ">
                Phone Number
              </p>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-10 rounded-md bg-slate-300 dark:bg-slate-700" />
                </div>
              ) : (
                <input
                  type="text"
                  name="phoneNumber"
                  defaultValue={restaurantData.data?.phoneNumber}
                  {...register("phoneNumber")}
                  className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Phone Number"
                />
              )}
            </label>
            {errors.phoneNumber && (
              <p className="text-rose-400">{errors?.phoneNumber?.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="gstPercentage">
              <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2 ">
                GST Percentage
              </p>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-10 rounded-md bg-slate-300 dark:bg-slate-700" />
                </div>
              ) : (
                <input
                  type="text"
                  name="gstPercentage"
                  defaultValue={restaurantData.data?.gstPercentage}
                  {...register("gstPercentage")}
                  className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="GST Percentage"
                />
              )}
            </label>
            {errors.gstPercentage && (
              <p className="text-rose-400">{errors.gstPercentage.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="gstNumber">
              <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2 ">
                GST Number
              </p>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-10 rounded-md bg-slate-300 dark:bg-slate-700" />
                </div>
              ) : (
                <input
                  type="text"
                  name="gstNumber"
                  defaultValue={restaurantData.data?.gstNumber}
                  {...register("gstNumber")}
                  className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="GST Number"
                />
              )}
            </label>
            {errors.gstNumber && (
              <p className="text-rose-400">{errors?.gstNumber?.message}</p>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="street">
              <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2 ">
                Street Address
              </p>

              {loading ? (
                <div className="animate-pulse">
                  <div className="h-16 rounded-md bg-slate-300 dark:bg-slate-700" />
                </div>
              ) : (
                <textarea
                  type="text"
                  name="street"
                  defaultValue={restaurantData.data?.address?.street}
                  {...register("address.street")}
                  className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Street Address"
                />
              )}
            </label>
            {errors.address && (
              <p className="text-rose-400">{errors.address?.street?.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="state">
              <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2 ">
                State
              </p>

              {loading ? (
                <div className="animate-pulse">
                  <div className="h-16 rounded-md bg-slate-300 dark:bg-slate-700" />
                </div>
              ) : (
                <select
                  name="state"
                  {...register("address.state")}
                  defaultValue={restaurantData.data?.address?.state}
                  className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary cursor-pointer"
                  placeholder="Select State"
                >
                  <option
                    value=""
                    className="py-2 cursor-pointer bg-light-base2 dark:bg-dark-base2 text-light-text1 dark:text-dark-text1 text-md"
                    disabled
                  >
                    -- Select State --
                  </option>
                  {states.map((option) => {
                    return (
                      <option
                        key={option.key}
                        value={option.name}
                        className="py-2 cursor-pointer bg-light-base2 dark:bg-dark-base2 text-light-text1 dark:text-dark-text1 text-md"
                      >
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </label>
            {errors.address && (
              <p className="text-rose-400"> {errors.address.state?.message} </p>
            )}
          </div>
          <div>
            <label htmlFor="pincode">
              <p className="mb-2 font-semibold text-light-text1 dark:text-dark-text2 ">
                Pincode
              </p>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-16 rounded-md bg-slate-300 dark:bg-slate-700" />
                </div>
              ) : (
                <input
                  type="text"
                  name="pincode"
                  defaultValue={restaurantData.data?.address?.pincode}
                  {...register("address.pincode")}
                  className="border-2 dark:border-0 bg-light-base2 dark:bg-dark-base2 placeholder-light-text2 text-light-text1 dark:text-dark-text1 text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Pincode"
                />
              )}
            </label>
            {errors.address && (
              <p className="text-rose-400">{errors.address.pincode?.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            disabled={loading}
            className="px-3.5 py-3 mt-5 w-1/2 md:w-1/4 rounded-lg bg-primary text-sm font-semibold hover:bg-[#e66e59] disabled:opacity-50"
          >
            {modifiedFlag && loading && (
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
            <span className="text-white ">Save Changes </span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
