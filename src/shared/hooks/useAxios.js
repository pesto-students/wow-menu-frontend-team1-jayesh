import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://wow-menu-staging.herokuapp.com/api";

const useAxios = ({ url = null, method = null, headers = null } = {}) => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const callApi = async ({
    apiMethod,
    apiUrl,
    params,
    apiBody,
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
    };

    if (config.url) {
      try {
        const responseData = await axios(config);
        setResponse(responseData.data);
        setloading(false);
        toast.success(successToastMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (navigationLink) {
          navigate(navigationLink);
        }
      } catch (err) {
        setError(err);
        setloading(false);
        toast.error(errorToastMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // axios(config)
      //   .then((res) => {
      //     setResponse(res.data);
      //     toast.success(successToastMessage, {
      //       position: "top-right",
      //       autoClose: 2000,
      //       hideProgressBar: true,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //     if (navigationLink) {
      //       navigate(navigationLink);
      //     }
      //   })
      //   .catch((err) => {
      //     setError(err);
      //     toast.error(errorToastMessage, {
      //       position: "top-right",
      //       autoClose: 2000,
      //       hideProgressBar: true,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   })
      //   .finally(() => {
      //     setloading(false);
      //   });
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return { response, error, loading, callApi };
};

export default useAxios;
