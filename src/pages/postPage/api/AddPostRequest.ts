import { NormalApi } from "../../../shared/api/NormalApi";

export interface PostImgsType {
  fileName: string;
  imgUrl: string;
}

export interface requestPostData {
  title: string;
  content: string;
  foreword: string;
  postImgs: PostImgsType[];
}

const AddPostRequest = (params: {
  category?: string;
  data: requestPostData;
}) => {
  const { category, data } = params;
  const formData = new FormData();
  console.log(formData, '---폼데이터---')
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  formData.append("body", blob);
  const request = NormalApi.post(`v1/api/post/${category}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return request;
};

export default AddPostRequest;

// function modifyPost() {
//   const fileUrls = document.getElementById('cancelUrl').value.split(',');
//   if (!fileUrls || fileUrls.length === 0) {
//       console.error('File URLs are required.');
//       return;
//   }

//   const files = document.getElementById('fileInput').files;
//   const formData = new FormData();
//   const requestData = {
//       title: '제목2445웹스톰',
//       content: '내용36테웹스톰'
//   };
//   const blob = new Blob([JSON.stringify(requestData)], {type: "application/json"});
//   formData.append('body', blob);
//   for (let i = 0; i < files.length; i++) {
//       formData.append('uploadFiles', files[i]);
//   }

//   axios.put(http://localhost:8080/v1/api/post/multipart-files/58?, formData, {
//       headers: {
//           'Content-Type': 'multipart/form-data'
//       }

//   })
//       .then(response => {
//           console.log('Files modified:', response.data);
//       })
//       .catch(error => {
//           console.error('Error modifying files:', error);
//       });
// }
