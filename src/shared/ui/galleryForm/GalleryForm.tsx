import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./GalleryForm.module.css";
import { RegitUpdateDeleteButton } from "shared/ui/regitUpdateDeleteButton/RegitUpdateDeleteButton";
import { useNavigate } from "react-router-dom";
import { FileType, UploadType } from "shared/type/GalleryType";
import { GalleryImageInput } from "entities/gallery";
import confirmAlert from "shared/lib/ConfirmAlert";

type GalleryFormProps = {
  initialTitle?: string;
  initialFiles?: FileType[];
  onSubmit: (data: UploadType) => void;
  buttonText: string;
};
export const GalleryForm = ({
  initialTitle = "",
  initialFiles = [],
  onSubmit,
  buttonText,
}: GalleryFormProps) => {
  const [titleValue, setTitleValue] = useState(initialTitle);
  const [uploadFiles, setUploadFiles] = useState<FileType[]>(initialFiles);
  const navigate = useNavigate();

  const handleUploadTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleImageUpload = (files: FileType[]) => {
    setUploadFiles((prev: any) => [...prev, ...files]);
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

    onSubmit(data);
  };

  const returnToGallery = () => {
    navigate("/admin/gallery");
  };

  useEffect(() => {
    setTitleValue(initialTitle);
    setUploadFiles(initialFiles);
  }, [initialTitle, initialFiles]);

  return (
    <form className={styles.container}>
      <div className={styles.contentWrapper}>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="제목을 입력해주세요"
          value={titleValue}
          onChange={handleUploadTitle}
        />
        <GalleryImageInput
          onUploadSuccess={handleImageUpload}
          uploadFiles={uploadFiles || []}
          setUploadFiles={setUploadFiles}
        />
      </div>
      <div className={styles.handleBtnWrapper}>
        <RegitUpdateDeleteButton
          content="작성취소"
          onClickHandler={returnToGallery}
        />
        <button
          className={styles.handleBtn}
          type="button"
          onClick={handleDataUpload}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};
