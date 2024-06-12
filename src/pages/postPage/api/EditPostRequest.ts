import { NormalApi } from "../../../shared/api/NormalApi";
import { requestPostData } from "./AddPostRequest";

const EditPostRequest = (params: {
  category?: string;
  data: requestPostData;
  postId?: string;
}) => {
  const { category, data, postId } = params;
  const formData = new FormData();
  console.log(formData, "---폼데이터---");
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  formData.append("body", blob);
  const request = NormalApi.put(`v1/api/post/${category}/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return request;
};

export default EditPostRequest;
