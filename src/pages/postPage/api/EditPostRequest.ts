import { Api } from "shared/api";
import { RemainingFilesType, RemainingImgsType } from "shared/type/PostType";

export interface EditRequestPostData {
  title: string;
  content: string;
  remainingFiles: RemainingFilesType[];
  postImgs: RemainingImgsType[];
}

const EditPostRequest = (params: {
  category?: string;
  requestData: EditRequestPostData;
  postId?: string;
  officialState: "official" | "normal";
  uploadFiles: FileList | null;
}) => {
  const { category, requestData, postId, officialState, uploadFiles } = params;
  const officialBoolean = officialState === "official";
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(requestData)], {
    type: "application/json",
  });
  formData.append("body", blob);
  if (!!uploadFiles) {
    for (let i = 0; i < uploadFiles.length; i++) {
      formData.append("uploadFiles", uploadFiles[i]);
    }
  }
  const request = Api.put(
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
