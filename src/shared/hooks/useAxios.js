import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useDarkMode from "./useDarkMode";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}api/`;

const useAxios = ({ url = null, method = null, headers = null } = {}) => {
  const [darkMode] = useDarkMode();
  const theme = darkMode ? "dark" : "light";
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const callApi = async ({
    apiMethod,
    apiUrl,
    params,
    apiBody,
    loadingToastMessage = null,
    successToastMessage = null,
    errorToastMessage = null,
    navigationLink = null,
  } = {}) => {
    const config = {
      method: apiMethod || method,
      url: apiUrl || url,
      params,
      data: apiBody,
      headers,
      withCredentials: true,
    };

    if (config.url) {
      try {
        setloading(true);
        const responseData = await toast.promise(axios(config), {
          pending: loadingToastMessage,
          success: {
            render: successToastMessage,
            autoClose: 2000,
            theme,
          },
        });
        setResponse(responseData.data);
        if (navigationLink) {
          navigate(navigationLink);
        }
      } catch (err) {
        setError(err);
        toast.error(
          errorToastMessage || err.response.data.message || err.message,
          {
            delay: 0,
            render: errorToastMessage,
            autoClose: 3000,
            theme,
          },
        );
      } finally {
        setloading(false);
      }
    }
  };

  useEffect(() => {
    if (url) {
      callApi();
    }
  }, []);

  return { response, error, loading, callApi };
};

export default useAxios;
