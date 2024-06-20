import { NormalApi } from "../../../shared/api/NormalApi";
import { PostImgsType } from "shared/type/PostType";

export interface requestPostData {
  title: string;
  content: string;
  foreword: string;
  postImgs: PostImgsType[];
}

const AddPostRequest = (params: {
  category?: string;
  data: requestPostData;
  isOfficial?: boolean;
}) => {
  const { category, data, isOfficial } = params;
  const formData = new FormData();
  console.log(formData, "---폼데이터---");
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  formData.append("body", blob);
  const request = NormalApi.post(
    `v1/api/post/${category}${isOfficial ? `?isOfficial=${isOfficial}` : ""}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return request;
};

export default AddPostRequest;
