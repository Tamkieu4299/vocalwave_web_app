import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchQuestion(assignment_id, options) {
    return useQuery(["question"], () => request.get(`/question/search_by_assignment/${assignment_id}`), {
      ...options,
    });
  }
  
  export default useFetchQuestion;
