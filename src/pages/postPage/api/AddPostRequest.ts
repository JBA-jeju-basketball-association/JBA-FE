import { NormalApi } from "../../../shared/api/NormalApi";
import { PostImgsType } from "shared/type/PostType";
import { PostFilesType } from "./GetFilesUrlRequest";

export interface requestPostData {
  title: string;
  content: string;
  foreword: "안내" | "개최" | "합격자 발표" | "입찰" | "기타" | "";
  postImgs: PostImgsType[];
}

const AddPostRequest = (params: {
  category?: string;
  data: requestPostData;
  OfficialState: "official" | "normal";
  postFiles: FileList | null;
}) => {
  const { category, data, OfficialState, postFiles } = params;
  const officialBoolean = OfficialState === "official" ? true : false;
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  formData.append("body", blob);
  if (!!postFiles) {
    for (let i = 0; i < postFiles.length; i++) {
      formData.append("uploadFiles", postFiles[i]);
      console.log(postFiles[i], '----postFiles---')
    }
  }
  const request = NormalApi.post(
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
