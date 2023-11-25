import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllDriver(params = "", options) {
  return useQuery(
    ["drivers"],
    () => request.get(`user/search/${params}`),
    options
  );
}

export default useFetchAllDriver;
