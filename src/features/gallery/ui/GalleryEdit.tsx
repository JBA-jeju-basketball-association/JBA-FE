import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./GalleryEdit.module.css";
import { RegitUpdateDeleteButton } from "shared/ui/regitUpdateDeleteButton/RegitUpdateDeleteButton";
import { useNavigate } from "react-router-dom";
import { FileType, UploadType } from "shared/type/GalleryType";
import { GalleryImageInput } from "entities/gallery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/ConfirmAlert";

type EditType = {
  gallery: {
    title: string;
    files: FileType[];
  };
  galleryId: string;
};

export const GalleryEdit = ({ gallery, galleryId }: EditType) => {
  const [titleValue, setTitleValue] = useState("");
  const [uploadFiles, setUploadFiles] = useState<FileType[]>([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleUploadTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const { mutate: editData } = useMutation({
    mutationKey: ["galleryEdit"],
    mutationFn: (data: UploadType) =>
      Api.put(`/v1/api/gallery/${galleryId}`, data),
    onSuccess: () => {
      confirmAlert("success", "이미지 수정이 완료되었습니다.");
      navigate("/gallery");
      queryClient.invalidateQueries({
        queryKey: ["galleryDetail"],
      });
    },
    onError: (e) => {
      console.log(e, "error");
      confirmAlert("error", "제목이 중복되었습니다");
    },
  });

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

    editData(data);
  };

  const returnToGallery = () => {
    navigate("/gallery");
  };

  useEffect(() => {
    setTitleValue(gallery.title);
    setUploadFiles(gallery.files);
  }, [gallery]);

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
      <div className={styles.editBtnWrapper}>
        <RegitUpdateDeleteButton
          content="작성취소"
          onClickHandler={returnToGallery}
        />
        <button
          className={styles.editBtn}
          type="button"
          onClick={handleDataUpload}
        >
          수정하기
        </button>
      </div>
    </form>
  );
};
