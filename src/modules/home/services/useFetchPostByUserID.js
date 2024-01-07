import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchPostByUserID(id = null, options) {
  return useQuery(
    ["newsByUserID"],
    () => request.get(`post/search-by-user-id/${id}`),
    options
  );
}

export default useFetchPostByUserID;
