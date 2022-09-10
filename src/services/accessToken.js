import useAxios from "../shared/hooks/useAxios";
import { ACCESS_TOKEN } from "./endpoints";

export default function TokenService() {
  const { callApi } = useAxios();

  const refreshAccessToken = () => {
    callApi({
      apiMethod: "get",
      apiUrl: `${ACCESS_TOKEN}`,
    });
  };

  return { refreshAccessToken };
}
