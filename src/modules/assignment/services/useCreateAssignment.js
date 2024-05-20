import { useMutation } from "react-query";
import request from "../../../utils/request";

function useCreateAssignment(options) {
  return useMutation(
    (data) =>
      request.post("assignment/add", data),
    options
  );
}

export default useCreateAssignment;
