import { useMutation } from "react-query";
import request from "../../../utils/request";

function useCreateQuestion(options) {
  return useMutation(
    (data) =>
      request.post("question/create-by-files", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    options
  );
}

export default useCreateQuestion;
