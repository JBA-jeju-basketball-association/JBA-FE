import { NormalApi } from "../../../shared/api/NormalApi";
import { requestPostData } from "./AddPostRequest";

const EditPostRequest = (params: {
  category?: string;
  requestData: requestPostData;
  postId?: string;
  officialState: "official" | "normal";
}) => {
  const { category, requestData, postId, officialState } = params;
  const officialBoolean = officialState === "official" ? true : false;
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(requestData)], { type: "application/json" });
  formData.append("body", blob);
  const request = NormalApi.put(
    `v1/api/post/${category}/${postId}${`?isOfficial=${officialBoolean}`}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return request;
};

export default EditPostRequest;
