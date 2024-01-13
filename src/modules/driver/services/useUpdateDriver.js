import { useMutation } from "react-query";
import request from "../../../utils/request";

function useUpdateDriver(options) {
  return useMutation(
    async ({ id, body }) => request.post(`user/update-user-info/${id}`, body),
    options
  );
}

export default useUpdateDriver;
