import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchSummary(id, options) {
    return useQuery(["summary"], () => request.get(`/auto/result-summary/${id}`), {
      ...options,
    });
  }
  
  export default useFetchSummary;
