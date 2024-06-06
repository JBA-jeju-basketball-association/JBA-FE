import React from "react";
import styles from "./GalleryUploadPage.module.css";
import {GalleryUpload} from "features/galleryUpload";

export const GalleryUploadPage = () => {
  return (
    <div className={styles.container}>
      <h1>갤러리 등록</h1>
      <GalleryUpload />
    </div>
  );
};
