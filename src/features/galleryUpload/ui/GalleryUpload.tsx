import React, { ChangeEvent } from "react";
import styles from "./GalleryUpload.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Api } from "shared/api";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { UploadType, FileType } from "shared/type/GalleryType";
import { GalleryImageInput } from "entity/galleryImageInput";

export const GalleryUpload = () => {
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
          official: false,
        },
      }),
    onSuccess: () => {
      confirmAlert("success", "이미지 등록이 완료되었습니다.");
      navigate("/gallery");
    },
    onError: (e) => {
      console.log(e, "error");
      confirmAlert("error", "제목이 중복되었습니다");
    },
  });

  const handleImageUpload = (files: FileType[]) => {
    setUploadFiles((prev) => [...prev, ...files]);
  };

  const handleDataUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = {
      title: titleValue,
      imgs: uploadFiles,
    };
    if (data.title === "") {
      confirmAlert("warning", "제목을 입력해주세요");
      return;
    }
    if (data.imgs.length === 0) {
      confirmAlert("warning", "이미지를 등록해주세요");
      return;
    }

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
