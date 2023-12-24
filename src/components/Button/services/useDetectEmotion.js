import { useQuery } from "react-query";
import request from "../../../utils/request";

function useDetectEmotion(params = "", options) {
  return useQuery(
    ["emotion"],
    () => request.get(`audio/search_emotion`),
    options
  );
}

export default useDetectEmotion;
