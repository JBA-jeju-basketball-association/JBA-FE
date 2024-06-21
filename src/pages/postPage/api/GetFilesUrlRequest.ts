import { NormalApi } from "../../../shared/api/NormalApi";

export interface PostFilesType {
  fileName: string;
  fileUrl: string;
}

const getFilesUrl = async (files: FileList | null): Promise<PostFilesType[]> => {
  const formData = new FormData();
  if(files !== null) {
    for(let i = 0; i < files.length; i++) {
      formData.append("uploadFiles", files[i]);
    }
  }
  const reponse = await NormalApi.post(
    `v1/api/storage/multipart-files`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const responseFileList = reponse.data.data
  return responseFileList;
};

export default getFilesUrl;
