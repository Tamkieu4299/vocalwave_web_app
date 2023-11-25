import { useMutation } from "react-query";
import request from "@/utils/request";

function useLogin(options) {
  return useMutation(
    async (data) => await request.post("auth/login-web", data),
    options
  );
}

export default useLogin;
