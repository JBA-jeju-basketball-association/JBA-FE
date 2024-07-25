import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Api } from "shared/api";
import styles from "./GalleryImageInput.module.css";
import { FileType } from "shared/type/GalleryType";
import { CloseIcon } from "utils/icon";
import confirmAlert from "shared/lib/alert/ConfirmAlert";

export type GalleryImageInputProps = {
  onUploadSuccess: (files: FileType[]) => void;
  uploadFiles: FileType[];
  setUploadFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
};

export const GalleryImageInput = ({
  onUploadSuccess,
  uploadFiles,
  setUploadFiles,
}: GalleryImageInputProps) => {
  const { mutate: uploadFile } = useMutation({
    mutationKey: ["galleryUploadFiles"],
    mutationFn: (files: FormData) =>
      Api.post("/v1/api/upload/uploadFiles", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          type: "small",
        },
      }),
    onSuccess: (res) => {
      const uploadFileList = res.data.data.map((file: FileType) => ({
        fileName: file.fileName,
        fileUrl: file.fileUrl,
      }));
      onUploadSuccess(uploadFileList);
    },
    onError: (error) => {
      console.log("파일 업로드 실패", error);
    },
  });

  const { mutate: deleteFile } = useMutation({
    mutationKey: ["galleryDeleteFiles"],
    mutationFn: (fileUrl: string) =>
      Api.delete("/v1/api/upload/uploadFiles", {
        params: {
          "file-url": fileUrl,
        },
      }),
    onSuccess: (_, fileUrl) => {
      setUploadFiles(uploadFiles.filter((file) => file.fileUrl !== fileUrl));
    },
    onError: () => {
      console.log("파일 삭제 실패");
    },
  });

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      if (uploadFiles.length + files.length > 20) {
        confirmAlert("warning", "최대 20개의 파일만 업로드할 수 있습니다.");
        return;
      }
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("uploadFiles", file);
      });
      uploadFile(formData);
    }
  };

  const handleFileDelete = (fileUrl: string) => {
    deleteFile(fileUrl);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="fileUpload" className={styles.fileLabel}>
        <div>이미지 업로드</div>
      </label>
      <input
        type="file"
        id="fileUpload"
        className={styles.fileInput}
        multiple
        onChange={(e) => handleFileUpload(e.target.files)}
      />
      <div className={styles.uploadInput}>
        {uploadFiles.map((file, index) => (
          <div key={index} className={styles.fileName}>
            {file.fileName}
            <CloseIcon
              width="15"
              height="15"
              fill="black"
              onClick={() => handleFileDelete(file.fileUrl)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
