import React, { ChangeEvent } from "react";
import styles from "./GalleryUpload.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Api } from "shared/api";
import { Link, useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { UploadType, FileType } from "shared/type/GalleryType";
import { GalleryImageInput } from "entities/gallery";
import { RegitUpdateDeleteButton } from "shared/ui/regitUpdateDeleteButton/RegitUpdateDeleteButton";
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

  const returnToGallery = () => {
    navigate("/gallery");
  };

  return (
    <form className={styles.container}>
      <div className={styles.listBtn}>
        <RegitUpdateDeleteButton
          content="목록"
          onClickHandler={returnToGallery}
        />
      </div>
      <div className={styles.uploadWrapper}>
        <div className={styles.contentWrapper}>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className={styles.titleInput}
            value={titleValue}
            onChange={handleUploadTitle}
          />
          <GalleryImageInput
            onUploadSuccess={handleImageUpload}
            uploadFiles={uploadFiles}
            setUploadFiles={setUploadFiles}
          />
        </div>
      </div>
      <div className={styles.uploadBtnWrapper}>
        <button
          className={styles.uploadBtn}
          type="button"
          onClick={handleDataUpload}
        >
          등록하기
        </button>
      </div>
    </form>
  );
};
