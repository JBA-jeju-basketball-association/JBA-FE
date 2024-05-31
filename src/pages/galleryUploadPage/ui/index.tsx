import React from "react";
import styles from "./galleryUploadPage.module.css";
import GalleryUpload from "features/galleryUpload/ui";

const GalleryUploadPage = () => {
  return (
    <div className={styles.container}>
      <h1>갤러리 등록</h1>
      <GalleryUpload />
    </div>
  );
};

export default GalleryUploadPage;
