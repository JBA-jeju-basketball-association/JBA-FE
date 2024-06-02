import React, { ChangeEvent } from "react";
import styles from "./galleryUpload.module.css";
import { useState } from "react";
import { AddFiles } from "features/competition/index";
import { useMutation } from "@tanstack/react-query";
import { Api } from "shared/api";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { uploadType } from "shared/type/Gallery";

const GalleryUpload = () => {
  const [titleValue, setTitleValue] = useState("");
  const [files, setFiles] = useState<any>([]);
  const navigate = useNavigate();

  const handleUploadTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const { mutate: uploadData } = useMutation({
    mutationKey: ["galleryUpload"],
    mutationFn: (data: uploadType) =>
      Api.post("/v1/api/gallery/register", data),
    onSuccess: () => {
      confirmAlert("success", "이미지 등록이 완료되었습니다.");
      navigate("/gallery");
    },
    onError: () => {
      console.log("업로드 실패");
    },
  });

  const uploadClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const data = {
      title: titleValue,
      files: files.map((file: any) => ({
        fileName: file.fileName,
        fileUrl: file.fileUrl,
      })),
    };

    uploadData(data);
  };

  // const { mutate: uploadData } = useMutation({
  //   mutationKey: ["galleryUpload"],
  //   mutationFn: (formData: FormData) =>
  //     Api.post("/v1/api/gallery/register", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }),
  //   onSuccess: () => {
  //     confirmAlert("success", "이미지 등록이 완료되었습니다.");
  //     navigate("/gallery");
  //   },
  //   onError: () => {
  //     console.log("업로드 실패");
  //   },
  // });

  // const uploadClick = (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", titleValue);
  //   files.forEach((file: any, index: number) => {
  //     formData.append(`files[${index}]`, file);
  //   });

  //   uploadData(formData);
  // };

  return (
    <form className={styles.contaienr}>
      <div className={styles.wrapper}>
        <p className={styles.title}>갤러리제목</p>
        <input
          type="text"
          className={styles.titleInput}
          value={titleValue}
          onChange={handleUploadTitle}
        />
        <p className={styles.upload}>첨부파일</p>
        <AddFiles files={files} setFiles={setFiles} />
      </div>
      <button className={styles.button} type="button" onClick={uploadClick}>
        등록하기
      </button>
    </form>
  );
};

export default GalleryUpload;

// import React, { ChangeEvent } from "react";
// import styles from "./galleryUpload.module.css";
// import { RegitUpdateDeleteButton } from "shared/ui/regitUpdateDeleteButton/RegitUpdateDeleteButton";
// import { useState, useEffect } from "react";
// import { AddFiles } from "features/competition/index";
// import { IFileTypes } from "shared/type/CompetitionType";
// import { competitionDetailAttachedFile } from "shared/type/CompetitionType";
// import { useMutation } from "@tanstack/react-query";
// import { Api } from "shared/api";
// import { useNavigate } from "react-router-dom";
// import confirmAlert from "shared/lib/ConfirmAlert";

// const GalleryUpload = () => {
//   const [titleValue, setTitleValue] = useState("");
//   const [files, setFiles] = useState<IFileTypes[]>([]);
//   const navigate = useNavigate();

//   const handleUploadTitle = (e: ChangeEvent<HTMLInputElement>) => {
//     setTitleValue(e.target.value);
//   };

//   const { mutate: uploadData } = useMutation({
//     mutationKey: ["galleryUpload"],
//     mutationFn: (formData: FormData) =>
//       Api.post("/v1/api/gallery/register", formData, {
//         headers: {
//           "Content-Type": "Multipart/form-data",
//         },
//         params: { offical: true },
//       }),
//     onSuccess: () => {
//       confirmAlert("success", "이미지 등록이 완료되었습니다.");
//       navigate("/gallery");
//     },
//     onError: () => {
//       console.log("업로드 실패패");
//     },
//   });

//   const uploadClick = (e: React.MouseEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", titleValue);
//     files.forEach((files, index) => {
//       formData.append(`files[${index}]`, files);
//     });

//     // uploadData(formData);
//   };
//   useEffect(() => {
//     uploadData();
//   }, []);

//   return (
//     <form className={styles.contaienr}>
//       <div className={styles.wrapper}>
//         <p className={styles.title}>갤러리제목</p>
//         <input
//           type="text"
//           className={styles.titleInput}
//           value={titleValue}
//           onChange={handleUploadTitle}
//         />
//         <p className={styles.upload}>첨부파일</p>
//         <AddFiles files={files} setFiles={setFiles} />
//       </div>
//       <button className={styles.button} type="button" onClick={uploadClick}>
//         등록하기
//       </button>
//     </form>
//   );
// };

// export default GalleryUpload;
