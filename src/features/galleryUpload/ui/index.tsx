import React, { ChangeEvent } from "react";
import styles from "./galleryUpload.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Api } from "shared/api";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { UploadType } from "shared/type/Gallery";
import GalleryImageInput from "entity/galleryImageInput/ui";
import { FileType } from "shared/type/Gallery";

const GalleryUpload = () => {
  const [titleValue, setTitleValue] = useState("");
  const [uploadFiles, setUploadFiles] = useState<FileType[]>([]);
  const navigate = useNavigate();

  const handleUploadTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const { mutate: uploadData } = useMutation({
    mutationKey: ["galleryUpload"],
    mutationFn: (data: UploadType) =>
      Api.post("/v1/api/gallery/register", data, {
        params: {
          official: true,
        },
      }),
    onSuccess: () => {
      confirmAlert("success", "이미지 등록이 완료되었습니다.");
      navigate("/gallery");
    },
    onError: () => {
      console.log("업로드 실패");
    },
  });

  //(제목이 중복됐을 가능성이 있습니다.) 400에러 처리

  const handleImageUpload = (files: FileType[]) => {
    setUploadFiles((prev) => [...prev, ...files]);
  };

  const handleDataUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = {
      title: titleValue,
      imgs: uploadFiles,
    };
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
        <GalleryImageInput
          onUploadSuccess={handleImageUpload}
          uploadFiles={uploadFiles}
          setUploadFiles={setUploadFiles}
        />
      </div>
      <button
        className={styles.button}
        type="button"
        onClick={handleDataUpload}
      >
        등록하기
      </button>
    </form>
  );
};

export default GalleryUpload;
