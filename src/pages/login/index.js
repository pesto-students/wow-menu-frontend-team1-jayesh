/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginSuccess } from "../../store/reducers/authReducer";
import { setRestaurant } from "../../store/reducers/restaurantReducer";
import user from "../../assets/images/user.svg";
import UserService from "../../services/user";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function Login() {
  const query = useQuery();
  const {
    response: loginResponse,
    loading: loginLoading,
    userLogin,
  } = UserService();
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    const apiBody = {
      username: data.username,
      password: data.password,
    };
    userLogin(apiBody);
  };

  useEffect(() => {
    if (query.get("success")) {
      if (query.get("success").toString() === "true") {
        toast.success("Your account has been verified!", {
          autoClose: 3000,
        });
      }
      if (query.get("success").toString() === "false") {
        if (query.get("errorCode")?.toString() === "3") {
          toast.info("User is already verified!", {
            autoClose: 3000,
          });
        } else if (query.get("errorCode")?.toString() === "2") {
          toast.warn("Invalid URL!", {
            autoClose: 3000,
          });
        } else {
          toast.warn("Unknown error!", {
            autoClose: 3000,
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (loginResponse?.data?.userDetails) {
      dispatch(loginSuccess(loginResponse));
      if (loginResponse?.data?.userDetails.role === "owner") {
        navigate("/dashboard/analytics");
      } else if (loginResponse?.data?.userDetails.role === "manager") {
        navigate("/dashboard/orders");
      } else {
        navigate("/dashboard/kitchen");
      }
      if (loginResponse?.data?.userDetails?.restaurant) {
        dispatch(setRestaurant(loginResponse?.data?.userDetails?.restaurant));
      }
    }
  }, [loginResponse]);

  return (
    <div className="flex w-full min-h-screen font-sans bg-gray-900 dark:bg-gray-800 bg-lightPattern">
      <div className="grid w-full sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5, transition: { duration: 0.1 } }}
            className="flex items-center justify-center h-full p-4"
          >
            <div className="flex dark">
              <svg
                id="wow"
                viewBox="0 0 117 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto sm:h-[10vw] md:h-[10vh] lg:h-[95px] h-[12vw] mr-2"
              >
                <path
                  d="M2.8623 2.5C2.57953 2.5 2.30997 2.61972 2.12038 2.82952C1.93078 3.03932 1.83887 3.31958 1.86741 3.60091L7.19241 56.1009C7.2442 56.6115 7.6741 57 8.18731 57H19.1373C19.6488 57 20.0779 56.614 20.1317 56.1053L22.9623 29.3848L25.7929 56.1053C25.8468 56.614 26.2758 57 26.7873 57H37.0623C37.5755 57 38.0054 56.6115 38.0572 56.1009L43.3822 3.60091C43.4107 3.31958 43.3188 3.03932 43.1292 2.82952C42.9396 2.61972 42.6701 2.5 42.3873 2.5L35.2623 2.5C34.7452 2.5 34.3133 2.89429 34.2664 3.4093L31.485 33.9487L28.5327 3.40379C28.4831 2.89116 28.0523 2.5 27.5373 2.5L18.5373 2.5C18.0223 2.5 17.5915 2.89116 17.5419 3.40379L14.5897 33.9487L11.8082 3.4093C11.7613 2.89429 11.3294 2.5 10.8123 2.5L2.8623 2.5ZM74.6396 2.5C74.3569 2.5 74.0873 2.61972 73.8977 2.82952C73.7081 3.03932 73.6162 3.31958 73.6448 3.60091L78.9697 56.1009C79.0215 56.6115 79.4514 57 79.9646 57H90.9146C91.4262 57 91.8552 56.614 91.9091 56.1053L94.7397 29.3848L97.5702 56.1053C97.6241 56.614 98.0531 57 98.5647 57H108.84C109.353 57 109.783 56.6115 109.835 56.1009L115.16 3.60091C115.188 3.31958 115.096 3.03932 114.907 2.82952C114.717 2.61972 114.447 2.5 114.165 2.5L107.04 2.5C106.523 2.5 106.091 2.89429 106.044 3.4093L103.262 33.9487L100.31 3.40379C100.26 2.89116 99.8297 2.5 99.3147 2.5L90.3147 2.5C89.7996 2.5 89.3688 2.89116 89.3193 3.40379L86.367 33.9487L83.5855 3.4093C83.5386 2.89429 83.1068 2.5 82.5896 2.5L74.6396 2.5ZM48.4548 53.9829C50.8444 56.5392 54.2423 57.75 58.4854 57.75C62.7284 57.75 66.1263 56.5392 68.5159 53.9829C70.8903 51.4428 72.0104 47.917 72.0104 43.55L72.0104 15.95C72.0104 11.583 70.8903 8.05717 68.5159 5.51712C66.1263 2.96078 62.7284 1.75 58.4854 1.75C54.2423 1.75 50.8444 2.96078 48.4548 5.51712C46.0804 8.05716 44.9604 11.583 44.9604 15.95L44.9604 43.55C44.9604 47.917 46.0804 51.4428 48.4548 53.9829ZM61.7604 44.075C61.7604 45.6874 61.4234 46.7107 60.9206 47.3194C60.4481 47.8914 59.7005 48.25 58.4854 48.25C57.2702 48.25 56.5226 47.8914 56.0501 47.3194C55.5473 46.7107 55.2104 45.6874 55.2104 44.075L55.2104 15.425C55.2104 13.8126 55.5473 12.7893 56.0501 12.1806C56.5226 11.6086 57.2702 11.25 58.4854 11.25C59.7005 11.25 60.4481 11.6086 60.9206 12.1806C61.4234 12.7893 61.7604 13.8126 61.7604 15.425L61.7604 44.075Z"
                  stroke="#EA7C69"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className="w-auto sm:h-[10vw] md:h-[10vh] lg:h-[95px] h-[12vw]"
                id="menu"
                viewBox="0 0 129 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.18243 1.5C1.63015 1.5 1.18243 1.94772 1.18243 2.5L1.18243 55C1.18243 55.5523 1.63015 56 2.18243 56H9.38244C9.93472 56 10.3824 55.5523 10.3824 55L10.3824 27.5813L14.5436 55.1493C14.6175 55.6384 15.0378 56 15.5324 56H22.4324C22.9271 56 23.3474 55.6384 23.4212 55.1493L27.5824 27.5813L27.5824 55C27.5824 55.5523 28.0302 56 28.5824 56H36.3824C36.9347 56 37.3824 55.5523 37.3824 55L37.3824 2.5C37.3824 1.94772 36.9347 1.5 36.3824 1.5L24.6074 1.5C24.1086 1.5 23.6861 1.8676 23.6171 2.36162L19.2824 33.3851L14.9478 2.36162C14.8788 1.8676 14.4563 1.5 13.9574 1.5L2.18243 1.5ZM42.5389 1.5C41.9866 1.5 41.5389 1.94772 41.5389 2.5L41.5389 55C41.5389 55.5523 41.9866 56 42.5389 56H65.0389C65.5912 56 66.0389 55.5523 66.0389 55V47.5C66.0389 46.9477 65.5912 46.5 65.0389 46.5H51.7889L51.7889 32.375L62.1139 32.375C62.6662 32.375 63.1139 31.9273 63.1139 31.375V23.875C63.1139 23.3227 62.6662 22.875 62.1139 22.875L51.7889 22.875L51.7889 11L65.0389 11C65.5912 11 66.0389 10.5523 66.0389 10V2.5C66.0389 1.94772 65.5912 1.5 65.0389 1.5L42.5389 1.5ZM69.785 1.5C69.2327 1.5 68.785 1.94772 68.785 2.5L68.785 55C68.785 55.5523 69.2327 56 69.785 56H77.135C77.6873 56 78.135 55.5523 78.135 55L78.135 23.9638L86.2168 55.2501C86.3308 55.6916 86.729 56 87.185 56H95.66C96.2123 56 96.66 55.5523 96.66 55L96.66 2.5C96.66 1.94772 96.2123 1.5 95.66 1.5L88.31 1.5C87.7577 1.5 87.31 1.94772 87.31 2.5V26.5549L81.1039 2.25257C80.9908 1.80979 80.592 1.5 80.135 1.5L69.785 1.5ZM103.903 53.0493L103.911 53.0573C106.252 55.5661 109.602 56.75 113.792 56.75C117.981 56.75 121.331 55.5661 123.673 53.0573L123.673 53.0574L123.68 53.0493C126.002 50.5068 127.092 46.9576 127.092 42.55L127.092 2.5C127.092 1.94772 126.644 1.5 126.092 1.5L118.142 1.5C117.59 1.5 117.142 1.94772 117.142 2.5L117.142 43.15C117.142 44.8496 116.781 45.8393 116.287 46.3661C116.282 46.372 116.276 46.378 116.271 46.3841C116.269 46.3865 116.266 46.389 116.264 46.3915C115.803 46.9186 115.087 47.25 113.942 47.25C112.809 47.25 112.052 46.9245 111.533 46.3789C111.077 45.8479 110.742 44.849 110.742 43.15L110.742 2.5C110.742 1.94772 110.294 1.5 109.742 1.5L101.492 1.5C100.94 1.5 100.492 1.94772 100.492 2.5L100.492 42.55C100.492 46.9576 101.582 50.5068 103.903 53.0493L103.903 53.0493Z"
                  stroke="#E0E6E9"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-2/3 p-6 bg-gray-900 rounded-lg h-max gap-y-6"
          >
            <h2 className="mb-5 text-2xl font-bold text-center text-white">
              Login
            </h2>
            <img className="h-32 mx-auto my-6" src={user} alt="" />
            <form onSubmit={handleSubmit(submitForm)}>
              <div className={`${errors?.username?.message ? "mb-2" : "mb-4"}`}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                    <FaRegUser />
                  </div>
                  <input
                    type="text"
                    name="username"
                    {...register("username")}
                    className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-sm block w-full pl-10 p-2.5 
                transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                    placeholder="Email/Username"
                    defaultValue="demo@gmail.com"
                  />
                </div>
                {errors.username && (
                  <p className="text-rose-400"> {errors.username.message} </p>
                )}
              </div>
              <div className={`${errors?.password?.message ? "mb-2" : "mb-4"}`}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                    <RiLockPasswordLine />
                  </div>
                  <input
                    type={passwordType}
                    name="password"
                    {...register("password")}
                    className="bg-gray-700 placeholder-gray-500 text-white text-sm rounded-sm block w-full px-10 p-2.5 
                  transition-colors duration-200 ease-in-out outline-none focus:bg-transparent focus:ring-1 focus:ring-primary"
                    placeholder="Password"
                    defaultValue="password12"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer">
                    <button
                      type="button"
                      className="text-xl"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-rose-400"> {errors.password.message} </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full px-8 py-2 text-lg rounded cursor-pointer bg-primary focus:outline-none hover:bg-primary/80 disabled:opacity-50"
              >
                <span className="text-white ">Login </span>
                {loginLoading && (
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
              </button>
            </form>

            <div className="block w-full mt-3 text-center text-white bottom-6 text-md">
              <span>Don&rsquo;t have an account? </span>
              <span className="font-bold cursor-pointer text-primary">
                <Link to="/signup">Sign Up</Link>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
