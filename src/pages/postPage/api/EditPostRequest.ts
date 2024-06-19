import { NormalApi } from "../../../shared/api/NormalApi";
import { requestPostData } from "./AddPostRequest";

const EditPostRequest = (params: {
  category?: string;
  data: requestPostData;
  postId?: string;
  isOfficial?: string;
}) => {
  const { category, data, postId, isOfficial } = params;
  const officialBoolean = isOfficial === "공지사항" ? true : false;
  console.log(officialBoolean, "-----officialBoolean------");
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
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
