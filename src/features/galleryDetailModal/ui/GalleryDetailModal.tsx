import React, { useEffect, useState } from "react";
import { CommonModal } from "shared/ui";
import styles from "./GalleryDetailModal.module.css";
import { CloseIcon, RightIcon, LeftIcon } from "utils/icon";
import { GalleryDetailProps } from "shared/type/GalleryType";

type GalleryDetailModalProps = {
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  galleryDetail: GalleryDetailProps | undefined;
};

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.8)",
    width: "100%",
    height: "100vh",
    zIndex: "101",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "60%",
    height: "90%",
    zIndex: "102",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
  },
};

export const GalleryDetailModal = ({
  modalOpen,
  setModalOpen,
  galleryDetail,
}: GalleryDetailModalProps) => {
  const { title, files } = galleryDetail ?? { title: "", files: [] };
  const [selectedImage, setSelectedImage] = useState(files[0]?.fileUrl || "");

  const handleImageClick = (fileUrl: string) => {
    setSelectedImage(fileUrl);
  };

  useEffect(() => {
    setSelectedImage(files[0]?.fileUrl);
  }, [files]);

  const prevSlide = () => {
    const currentIndex = files.findIndex(
      (file) => file.fileUrl === selectedImage
    );
    if (currentIndex === 0) {
      setSelectedImage(files[files.length - 1].fileUrl);
      return;
    }
    setSelectedImage(files[currentIndex - 1].fileUrl);
  };

  const nextSlide = () => {
    const currentIndex = files.findIndex(
      (file) => file.fileUrl === selectedImage
    );
    if (currentIndex === files.length - 1) {
      setSelectedImage(files[0].fileUrl);
      return;
    }
    setSelectedImage(files[currentIndex + 1].fileUrl);
  };

  return (
    <CommonModal
      isopen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
    >
      <div className={styles.container}>
        <h1>{title}</h1>
        <CloseIcon
          width="60"
          height="60"
          onClick={() => setModalOpen(false)}
          className={styles.closeIcon}
        />
        <div className={styles.centerImagWrapper}>
          <LeftIcon width="60" height="60" onClick={prevSlide} />
          <img
            src={selectedImage}
            alt="중간이미지"
            className={styles.centerImage}
          />
          <RightIcon width="60" height="60" onClick={nextSlide} />
        </div>
        <div className={styles.detailImageListWrapper}>
          {files.map((file, index) => (
            <img
              className={
                selectedImage === file.fileUrl
                  ? styles.selectedImage
                  : styles.detailImage
              }
              src={file.fileUrl}
              key={index}
              alt="갤러리 이미지"
              onClick={() => handleImageClick(file.fileUrl)}
            />
          ))}
        </div>
      </div>
    </CommonModal>
  );
};
