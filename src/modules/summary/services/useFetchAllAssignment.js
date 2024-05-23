import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllAssignment(options) {
  return useQuery(
    ["assignments"],
    () => request.get(`assignment/search`),
    options
  );
}

export default useFetchAllAssignment;
