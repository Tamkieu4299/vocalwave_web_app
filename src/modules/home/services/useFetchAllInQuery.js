import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllInQuery(param = "", options) {
  return useQuery(
    ["news"],
    () => request.get(`post/search/`),
    options
  );
}

export default useFetchAllInQuery;
