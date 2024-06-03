import React, { ChangeEvent } from "react";
import styles from "./galleryUpload.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Api } from "shared/api";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { uploadType } from "shared/type/Gallery";

const GalleryUpload = () => {
  const [titleValue, setTitleValue] = useState("");
  // const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [uploadFiles, setUploadFiles] = useState<
    { fileName: string; fileUrl: string }[]
  >([]);
  const navigate = useNavigate();

  //title의 값을 받아오는 함수
  const handleUploadTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  // 파일 업로드 함수
  const { mutate: uploadData } = useMutation({
    mutationKey: ["galleryUpload"],
    mutationFn: (data: uploadType) =>
      Api.post("/v1/api/gallery/register?official=true", data),
    onSuccess: () => {
      confirmAlert("success", "이미지 등록이 완료되었습니다.");
      navigate("/gallery");
    },
    onError: () => {
      console.log("업로드 실패");
    },
  });

  // 이미지 파일을 url로 변환하는 함수
  const { mutate: uploadFile } = useMutation({
    mutationKey: ["galleryUploadFiles"],
    mutationFn: (files: FormData) =>
      Api.post("/v1/api/storage/multipart-files", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          type: "small",
        },
      }),
    onSuccess: (res) => {
      console.log("파일 업로드 성공:", res.data); //res.data 여기는 성공
      setUploadFiles([
        {
          fileName: res.data.data[0].fileName,
          fileUrl: res.data.data[0].fileUrl,
        },
      ]);
    },
    onError: (error) => {
      console.log("파일 업로드 실패", error); //근데 바로 실패 뜸
    },
  });
  console.log("업로드파일", uploadFiles);

  // 이미지 파일을 url로 변환하는 함수
  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("uploadFiles", file);
      });
      console.log("FormData:", formData); // FormData 객체에 안닮김
      uploadFile(formData);
    }
  };

  // 등록하기 버튼 클릭 시 실행되는 함수
  const handleUpload = (e: React.MouseEvent) => {
    e.preventDefault();

    const data = {
      title: titleValue,
      imgs: uploadFiles,
    };

    // console.log("업로드파일", uploadFiles); //언디파인드 나옴
    console.log("데이터:", data); //언디파인드 나옴

    uploadData(data);
  };

  return (
    <form className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>갤러리제목</p>
        <input
          type="text"
          className={styles.titleInput}
          value={titleValue}
          onChange={handleUploadTitle}
        />
        <p className={styles.upload}>첨부파일</p>
        <input
          type="file"
          className={styles.fileInput}
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>
      <button className={styles.button} type="button" onClick={handleUpload}>
        등록하기
      </button>
    </form>
  );
};

export default GalleryUpload;
