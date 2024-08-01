import { Api } from "shared/api";
import { PostImgsType } from "shared/type/PostType";

export interface requestPostData {
  title: string;
  content: string;
  postImgs: {
    fileName:string,
    imgUrl: string,
  }[];
}

const AddPostRequest = (params: {
  category?: string;
  data: requestPostData;
  OfficialState: "official" | "normal";
  postFiles: FileList | null;
}) => {
  const { category, data, OfficialState, postFiles } = params;
  const officialBoolean = OfficialState === "official";
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  formData.append("body", blob);
  if (!!postFiles) {
    for (let i = 0; i < postFiles.length; i++) {
      formData.append("uploadFiles", postFiles[i]);
    }
  }
  const request = Api.post(
    `v1/api/post/${category}${officialBoolean ? `?isOfficial=${officialBoolean}` : ""}`,
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
