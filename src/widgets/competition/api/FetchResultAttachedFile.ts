import {Api} from "../../../shared/api";


export default function fetchResultAttachedFile(file:File) {
    const formData:FormData = new FormData();
    formData.append("uploadFiles", file)
    return Api.post("v1/api/storage/multipart-files",formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}