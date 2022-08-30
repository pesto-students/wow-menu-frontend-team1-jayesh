/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdArrowBackIosNew } from "react-icons/md";
import RestaurantService from "../../../../services/restaurant";
import { setRestaurant } from "../../../../store/reducers/restaurantReducer";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  gstPercentage: yup
    .number()
    .typeError("You must specify a number")
    .required("GST Percentage is required"),
  gstNumber: yup.string().required("GST Number is required"),
  address: yup.string().required("Address is required"),
  totalTables: yup
    .number()
    .typeError("You must specify a number")
    .required("Total Tables number is required"),
});

export default function RestaurantDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurantId = useSelector((state) => state.restaurant.id);
  const userId = useSelector((state) => state.auth.user.userDetails.id);
  const { response, getRestaurant, postRestaurant, updateRestaurant } =
    RestaurantService();

  const [restaurantData, setRestaurantData] = useState({ data: null });
  const {
    register,
    handleSubmit,
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
      dispatch(setRestaurant(response.data));
    }
  }, [response]);

  const submitForm = (data) => {
    if (restaurantId) {
      updateRestaurant(restaurantId, { ...data });
    } else {
      postRestaurant({ ...data, createdBy: userId });
    }
  };

  return (
    <div className="flex flex-col flex-1 p-4 pl-28">
      <div className="flex justify-start mb-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/settings")}
          className="px-3.5 mr-2 py-1 w-max rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#e66e59]"
        >
          <MdArrowBackIosNew />
        </button>
        <h3 className="text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
          Restaurant Details
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
          <li className="text-gray-500">Restaurant Details</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid mt-5 md:grid-cols-2">
          <div className="">
            <div className="relative mb-4">
              <label htmlFor="name">
                <div className="mb-2 font-semibold text-slate-300">Name</div>
                <input
                  type="text"
                  name="name"
                  defaultValue={restaurantData.data?.name}
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
              <label htmlFor="gstPercentage">
                <div className="mb-2 font-semibold text-slate-300">
                  GST Percentage
                </div>
                <input
                  type="text"
                  name="gstPercentage"
                  defaultValue={restaurantData.data?.gstPercentage}
                  {...register("gstPercentage")}
                  className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="GST Percentage"
                />
              </label>
              {errors.gstPercentage && (
                <p className="text-rose-400">{errors.gstPercentage.message}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label htmlFor="address">
                <div className="mb-2 font-semibold text-slate-300">Address</div>
                <textarea
                  type="text"
                  name="address"
                  defaultValue={restaurantData.data?.address}
                  {...register("address")}
                  className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Address"
                />
              </label>
              {errors.address && (
                <p className="text-rose-400"> {errors.address.message} </p>
              )}
            </div>
          </div>
          <div className="md:pl-4">
            <div className="relative mb-4">
              <label htmlFor="phoneNumber">
                <div className="mb-2 font-semibold text-slate-300">
                  Phone Number
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  defaultValue={restaurantData.data?.phoneNumber}
                  {...register("phoneNumber")}
                  className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Phone Number"
                />
              </label>
              {errors.phoneNumber && (
                <p className="text-rose-400">{errors?.phoneNumber?.message}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label htmlFor="gstNumber">
                <div className="mb-2 font-semibold text-slate-300">
                  GST Number
                </div>
                <input
                  type="text"
                  name="gstNumber"
                  defaultValue={restaurantData.data?.gstNumber}
                  {...register("gstNumber")}
                  className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="GST Number"
                />
              </label>
              {errors.gstNumber && (
                <p className="text-rose-400">{errors?.gstNumber?.message}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label htmlFor="totalTables">
                <div className="mb-2 font-semibold text-slate-300">
                  Total Tables
                </div>
                <input
                  type="text"
                  name="totalTables"
                  defaultValue={restaurantData.data?.totalTables}
                  {...register("totalTables")}
                  className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-md block w-full pl-3 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                  placeholder="Total Tables"
                />
              </label>
              {errors.totalTables && (
                <p className="text-rose-400">{errors?.totalTables?.message}</p>
              )}
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
    </div>
  );
}
