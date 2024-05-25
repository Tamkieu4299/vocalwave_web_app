import { useMutation } from "react-query";
import request from "../../../utils/request";

function useRunEvaProcess(options) {
  return useMutation(
    (data) =>
      request.post("auto/auto-grader", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    options
  );
}

export default useRunEvaProcess;
