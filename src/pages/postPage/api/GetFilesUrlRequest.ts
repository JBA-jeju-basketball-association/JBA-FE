import { NormalApi } from "../../../shared/api/NormalApi";

const getFilesUrl = async (files: FileList | null) => {
  console.log(files, '-----files----')
  const formData = new FormData();
  if(files !== null) {
    for(let i = 0; i < files.length; i++) {
      const blob = new Blob([JSON.stringify(files[i])], { type: "application/json" });
      formData.append("uploadFiles", blob);
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
  console.log(reponse.data, '-----reponse.data-----');
  return reponse;
};

export default getFilesUrl;
